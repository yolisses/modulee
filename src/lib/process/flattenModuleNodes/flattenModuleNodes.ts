import { createId } from '$lib/global/createId';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import type { ModuleNodeData } from '$lib/node/data/variants/ModuleNodeData';

function copyNodesFromModule(
	graphRegistry: GraphRegistry,
	fromModuleId: string,
	toModuleId: string,
) {
	const idMap = new Map();
	const nodesToCopy = graphRegistry.nodes
		.values()
		.filter((nodeData) => nodeData.internalModuleId === fromModuleId);

	nodesToCopy.forEach((nodeData) => {
		const copy = structuredClone(nodeData);
		copy.id = createId();
		copy.internalModuleId = toModuleId;
		graphRegistry.nodes.add(copy);
		idMap.set(nodeData.id, copy.id);
	});

	graphRegistry.connections
		.values()
		.filter((connectionData) => {
			return idMap.has(connectionData.inputPath.nodeId) && idMap.has(connectionData.targetNodeId);
		})
		.forEach((connectionData) => {
			const copy = structuredClone(connectionData);
			copy.id = createId();
			copy.inputPath.nodeId = idMap.get(connectionData.inputPath.nodeId);
			copy.targetNodeId = idMap.get(connectionData.targetNodeId);
			graphRegistry.connections.add(copy);
			idMap.set(connectionData.id, copy.id);
		});
}

function flattenModuleNode(graphRegistry: GraphRegistry, moduleNodeData: ModuleNodeData) {
	if (!moduleNodeData.extras.moduleReference) {
		graphRegistry.nodes.remove(moduleNodeData);
		return;
	}

	const { moduleId } = moduleNodeData.extras.moduleReference;

	copyNodesFromModule(graphRegistry, moduleNodeData.internalModuleId, moduleId);
	graphRegistry.nodes.remove(moduleNodeData);
}

export function flattenModuleNodes(graphRegistry: GraphRegistry) {
	graphRegistry.nodes.values().forEach((nodeData) => {
		if (nodeData.type === 'ModuleNode') {
			flattenModuleNode(graphRegistry, nodeData);
		}
	});
}
