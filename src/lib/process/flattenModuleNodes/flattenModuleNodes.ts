import { createId } from '$lib/global/createId';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import type { ModuleNodeData } from '$lib/node/data/variants/ModuleNodeData';

// Recursive, depth first
function flattenModuleNodesStep(graphRegistry: GraphRegistry, internalModuleId: string) {
	graphRegistry.nodes.values().forEach((nodeData) => {
		if (nodeData.internalModuleId !== internalModuleId) return;
		if (nodeData.type !== 'ModuleNode') return;
		const moduleNodeData = nodeData as ModuleNodeData;
		const moduleId = moduleNodeData.extras.moduleReference?.moduleId;
		if (!moduleId) return;
		flattenModuleNodesStep(graphRegistry, moduleId);

		const replacements = new Map<string, string>();

		graphRegistry.nodes
			.values()
			.filter((nodeData) => {
				return (
					nodeData.internalModuleId === moduleId &&
					nodeData.type !== 'ModuleNode' &&
					nodeData.type !== 'InputNode'
				);
			})
			.forEach((nodeData) => {
				const copy = structuredClone(nodeData);
				const newId = createId();
				replacements.set(nodeData.id, newId);
				copy.id = newId;
				copy.internalModuleId = internalModuleId;
				graphRegistry.nodes.add(copy);
			});

		graphRegistry.connections.values().forEach((connectionData) => {
			const targetNodeId = replacements.get(connectionData.targetNodeId);
			const originNodeId = replacements.get(connectionData.inputPath.nodeId);
			if (targetNodeId && originNodeId) {
				const copy = structuredClone(connectionData);
				copy.id = createId();
				copy.targetNodeId = targetNodeId;
				copy.inputPath.nodeId = originNodeId;
				graphRegistry.connections.add(copy);
			}
		});

		graphRegistry.nodes.remove(moduleNodeData);
		graphRegistry.nodes.removeByCondition((nodeData) => nodeData.type === 'InputNode');
	});
}

export function flattenModuleNodes(graphRegistry: GraphRegistry) {
	graphRegistry.internalModules.values().forEach((internalModule) => {
		flattenModuleNodesStep(graphRegistry, internalModule.id);
	});
}
