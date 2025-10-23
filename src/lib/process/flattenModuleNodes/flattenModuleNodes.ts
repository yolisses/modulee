import type { ConnectionData } from '$lib/connection/ConnectionData';
import { createId } from '$lib/global/createId';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import type { NodeData } from '$lib/node/data/NodeData';
import type { ModuleNodeData } from '$lib/node/data/variants/ModuleNodeData';

function copyNode(
	graphRegistry: GraphRegistry,
	idMap: Map<string, string>,
	nodeData: NodeData,
	toModuleId: string,
) {
	const copy = structuredClone(nodeData);
	copy.id = createId();
	copy.internalModuleId = toModuleId;
	graphRegistry.nodes.add(copy);
	idMap.set(nodeData.id, copy.id);
}

function copyConnection(
	graphRegistry: GraphRegistry,
	idMap: Map<string, string>,
	connectionData: ConnectionData,
) {
	const copy = structuredClone(connectionData);
	copy.id = createId();
	copy.inputPath.nodeId = idMap.get(connectionData.inputPath.nodeId)!;
	copy.targetNodeId = idMap.get(connectionData.targetNodeId)!;
	graphRegistry.connections.add(copy);
}

function copyNodesFromModule(
	graphRegistry: GraphRegistry,
	fromModuleId: string,
	toModuleId: string,
) {
	const idMap = new Map();
	const inputTargetMap = new Map();
	graphRegistry.nodes.values().filter((nodeData) => {
		if (nodeData.internalModuleId !== fromModuleId) return;
		if (nodeData.type === 'ModuleNode') return;
		if (nodeData.type === 'OutputNode') return;
		if (nodeData.type === 'InputNode') {
			const targetNode = graphRegistry.connections.values().find((connectionData) => {
				return (connectionData.inputPath.nodeId = nodeData.id);
			});
			inputTargetMap.set(nodeData.id, targetNode?.targetNodeId);
		} else {
			copyNode(graphRegistry, idMap, nodeData, toModuleId);
		}
	});

	graphRegistry.connections.values().forEach((connectionData) => {
		const isInternalConnection =
			idMap.has(connectionData.inputPath.nodeId) && idMap.has(connectionData.targetNodeId);
		if (isInternalConnection) {
			copyConnection(graphRegistry, idMap, connectionData);
		}
	});
}

function flattenModuleNode(graphRegistry: GraphRegistry, moduleNodeData: ModuleNodeData) {
	if (!moduleNodeData.extras.moduleReference) {
		graphRegistry.nodes.remove(moduleNodeData);
		return;
	}

	const { moduleId } = moduleNodeData.extras.moduleReference;

	copyNodesFromModule(graphRegistry, moduleId, moduleNodeData.internalModuleId);
	graphRegistry.nodes.remove(moduleNodeData);
}

export function flattenModuleNodes(graphRegistry: GraphRegistry) {
	graphRegistry.nodes.values().forEach((nodeData) => {
		if (nodeData.type === 'ModuleNode') {
			flattenModuleNode(graphRegistry, nodeData);
		}
	});
}
