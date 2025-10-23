import type { ConnectionData } from '$lib/connection/ConnectionData';
import { createId } from '$lib/global/createId';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import type { NodeData } from '$lib/node/data/NodeData';
import type { InputNodeData } from '$lib/node/data/variants/InputNodeData';
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
	moduleNodeData: ModuleNodeData,
) {
	const idMap = new Map<string, string>();
	graphRegistry.nodes.values().filter((nodeData) => {
		if (nodeData.internalModuleId !== fromModuleId) return;
		if (nodeData.type === 'ModuleNode') return;
		if (nodeData.type === 'OutputNode') return;
		if (nodeData.type === 'InputNode') return;
		copyNode(graphRegistry, idMap, nodeData, toModuleId);
	});

	graphRegistry.connections.values().forEach((connectionData) => {
		const {
			inputPath: { nodeId: originNodeId },
			targetNodeId,
		} = connectionData;

		if (idMap.has(originNodeId)) {
			if (idMap.has(targetNodeId)) {
				copyConnection(graphRegistry, idMap, connectionData);
			} else {
				const targetNode = graphRegistry.nodes.getOrNull(targetNodeId);
				if (targetNode?.type === 'InputNode') {
					copyConnectionToInputNode(
						graphRegistry,
						targetNode,
						moduleNodeData,
						connectionData,
						idMap,
					);
				}
			}
		}
	});
}

function copyConnectionToInputNode(
	graphRegistry: GraphRegistry,
	targetNode: InputNodeData,
	moduleNodeData: ModuleNodeData,
	connectionData: ConnectionData,
	idMap: Map<string, string>,
) {
	const previousConnectionData = graphRegistry.connections.values().find((connectionData) => {
		return (
			connectionData.inputPath.inputKey === targetNode.id &&
			connectionData.inputPath.nodeId === moduleNodeData.id
		);
	});

	if (previousConnectionData) {
		const copy = structuredClone(connectionData);
		copy.id = createId();
		copy.inputPath.nodeId = idMap.get(connectionData.inputPath.nodeId)!;
		graphRegistry.connections.add(copy);
		copy.targetNodeId = previousConnectionData.targetNodeId;
	}
}

function flattenModuleNode(graphRegistry: GraphRegistry, moduleNodeData: ModuleNodeData) {
	if (moduleNodeData.extras.moduleReference) {
		const { moduleId } = moduleNodeData.extras.moduleReference;
		copyNodesFromModule(graphRegistry, moduleId, moduleNodeData.internalModuleId, moduleNodeData);
	}
	graphRegistry.nodes.remove(moduleNodeData);
	graphRegistry.connections.removeByCondition((connectionData) => {
		return connectionData.inputPath.nodeId === moduleNodeData.id;
	});
}

export function flattenModuleNodes(graphRegistry: GraphRegistry) {
	graphRegistry.nodes.values().forEach((nodeData) => {
		if (nodeData.type === 'ModuleNode') {
			flattenModuleNode(graphRegistry, nodeData);
		}
	});
}
