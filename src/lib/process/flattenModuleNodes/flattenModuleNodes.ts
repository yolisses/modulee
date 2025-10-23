import type { ConnectionData } from '$lib/connection/ConnectionData';
import { createId } from '$lib/global/createId';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import type { NodeData } from '$lib/node/data/NodeData';
import type { InputNodeData } from '$lib/node/data/variants/InputNodeData';
import type { ModuleNodeData } from '$lib/node/data/variants/ModuleNodeData';

/**
 * Creates a copy of a node in the target module and records the ID mapping.
 */
function copyNode(
	graphRegistry: GraphRegistry,
	idMap: Map<string, string>,
	nodeData: NodeData,
	toModuleId: string,
): void {
	const copy = structuredClone(nodeData);
	copy.id = createId();
	copy.internalModuleId = toModuleId;
	idMap.set(nodeData.id, copy.id);
	graphRegistry.nodes.add(copy);
}

/**
 * Creates a copy of a connection with remapped node IDs.
 */
function copyConnection(
	graphRegistry: GraphRegistry,
	idMap: Map<string, string>,
	connectionData: ConnectionData,
): void {
	const copy = structuredClone(connectionData);
	copy.id = createId();
	copy.inputPath.nodeId = idMap.get(connectionData.inputPath.nodeId)!;
	copy.targetNodeId = idMap.get(connectionData.targetNodeId)!;
	graphRegistry.connections.add(copy);
}

/**
 * Checks if a node should be copied during module flattening. Excludes
 * ModuleNode, OutputNode, and InputNode types.
 */
function shouldCopyNode(nodeData: NodeData, fromModuleId: string): boolean {
	if (nodeData.internalModuleId !== fromModuleId) return false;
	if (nodeData.type === 'ModuleNode') return false;
	if (nodeData.type === 'OutputNode') return false;
	if (nodeData.type === 'InputNode') return false;
	return true;
}

/**
 * Finds the connection that provides input to a module node's input key.
 */
function findModuleInputConnection(
	graphRegistry: GraphRegistry,
	moduleNodeData: ModuleNodeData,
	inputNodeId: string,
): ConnectionData | undefined {
	return graphRegistry.connections.values().find((connectionData) => {
		return (
			connectionData.inputPath.inputKey === inputNodeId &&
			connectionData.inputPath.nodeId === moduleNodeData.id
		);
	});
}

/**
 * Creates a connection that bypasses an InputNode by connecting directly to the
 * module node's input source.
 */
function copyConnectionBypassingInputNode(
	graphRegistry: GraphRegistry,
	targetNode: InputNodeData,
	moduleNodeData: ModuleNodeData,
	connectionData: ConnectionData,
	idMap: Map<string, string>,
): void {
	const moduleInputConnection = findModuleInputConnection(
		graphRegistry,
		moduleNodeData,
		targetNode.id,
	);

	if (!moduleInputConnection) return;

	const copy = structuredClone(connectionData);
	copy.id = createId();
	copy.inputPath.nodeId = idMap.get(connectionData.inputPath.nodeId)!;
	copy.targetNodeId = moduleInputConnection.targetNodeId;
	graphRegistry.connections.add(copy);
}

/**
 * Determines if a connection should be copied during module flattening.
 */
function shouldCopyConnection(
	idMap: Map<string, string>,
	originNodeId: string,
	targetNodeId: string,
): boolean {
	return idMap.has(originNodeId) && idMap.has(targetNodeId);
}

/**
 * Handles connection copying with special logic for InputNode targets.
 */
function processConnection(
	graphRegistry: GraphRegistry,
	idMap: Map<string, string>,
	moduleNodeData: ModuleNodeData,
	connectionData: ConnectionData,
): void {
	const { inputPath, targetNodeId } = connectionData;
	const originNodeId = inputPath.nodeId;

	if (!idMap.has(originNodeId)) return;

	if (shouldCopyConnection(idMap, originNodeId, targetNodeId)) {
		copyConnection(graphRegistry, idMap, connectionData);
	} else {
		const targetNode = graphRegistry.nodes.getOrNull(targetNodeId);
		if (targetNode?.type === 'InputNode') {
			copyConnectionBypassingInputNode(
				graphRegistry,
				targetNode,
				moduleNodeData,
				connectionData,
				idMap,
			);
		}
	}
}

/**
 * Copies all eligible nodes and their connections from a source module to a
 * target module.
 */
function copyNodesFromModule(
	graphRegistry: GraphRegistry,
	idMap: Map<string, string>,
	fromModuleId: string,
	toModuleId: string,
	moduleNodeData: ModuleNodeData,
): void {
	// Copy nodes
	graphRegistry.nodes.values().forEach((nodeData) => {
		if (shouldCopyNode(nodeData, fromModuleId)) {
			copyNode(graphRegistry, idMap, nodeData, toModuleId);
		}
	});

	// Copy connections
	graphRegistry.connections.values().forEach((connectionData) => {
		processConnection(graphRegistry, idMap, moduleNodeData, connectionData);
	});
}

/**
 * Finds the output connection from a module and returns the mapped target ID.
 */
function getModuleNodeOutputTargetId(
	graphRegistry: GraphRegistry,
	moduleNodeData: ModuleNodeData,
	idMap: Map<string, string>,
): string | undefined {
	const moduleId = moduleNodeData.extras.moduleReference?.moduleId;
	if (!moduleId) return undefined;

	const outputNode = graphRegistry.nodes.values().find((nodeData) => {
		return nodeData.type === 'OutputNode' && nodeData.internalModuleId === moduleId;
	});

	if (!outputNode) return undefined;

	const connection = graphRegistry.connections.values().find((connectionData) => {
		return connectionData.inputPath.nodeId === outputNode.id;
	});

	if (!connection) return undefined;

	return idMap.get(connection.targetNodeId);
}

/**
 * Updates connections that reference the module node being flattened.
 */
function updateModuleNodeConnections(
	graphRegistry: GraphRegistry,
	moduleNodeData: ModuleNodeData,
	outputTargetId: string | undefined,
): void {
	const connectionsToRemove: ConnectionData[] = [];

	graphRegistry.connections.values().forEach((connectionData) => {
		const isToModuleNode = connectionData.targetNodeId === moduleNodeData.id;
		const isFromModuleNode = connectionData.inputPath.nodeId === moduleNodeData.id;

		if (isToModuleNode) {
			if (outputTargetId) {
				connectionData.targetNodeId = outputTargetId;
			} else {
				connectionsToRemove.push(connectionData);
			}
		}

		if (isFromModuleNode) {
			connectionsToRemove.push(connectionData);
		}
	});

	connectionsToRemove.forEach((connection) => {
		graphRegistry.connections.remove(connection);
	});
}

/**
 * Flattens a single module node by copying its internal nodes and rewiring
 * connections.
 */
function flattenModuleNode(graphRegistry: GraphRegistry, moduleNodeData: ModuleNodeData): void {
	const idMap = new Map<string, string>();
	const moduleId = moduleNodeData.extras.moduleReference?.moduleId;

	if (moduleId) {
		copyNodesFromModule(
			graphRegistry,
			idMap,
			moduleId,
			moduleNodeData.internalModuleId,
			moduleNodeData,
		);
	}

	const outputTargetId = getModuleNodeOutputTargetId(graphRegistry, moduleNodeData, idMap);
	updateModuleNodeConnections(graphRegistry, moduleNodeData, outputTargetId);

	graphRegistry.nodes.remove(moduleNodeData);
}

/**
 * Flattens all module nodes in the graph by replacing them with their internal
 * node structures.
 */
export function flattenModuleNodes(graphRegistry: GraphRegistry): void {
	const moduleNodes = graphRegistry.nodes
		.values()
		.filter((nodeData) => nodeData.type === 'ModuleNode') as ModuleNodeData[];

	moduleNodes.forEach((moduleNodeData) => {
		flattenModuleNode(graphRegistry, moduleNodeData);
	});
}
