import { createId } from '$lib/global/createId';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import type { ModuleNodeData } from '$lib/node/data/variants/ModuleNodeData';

function propagateFlattenModuleNodes(graphRegistry: GraphRegistry, internalModuleId: string) {
	graphRegistry.nodes.values().forEach((nodeData) => {
		if (nodeData.internalModuleId !== internalModuleId) return;
		if (nodeData.type !== 'ModuleNode') return;
		const moduleNodeData = nodeData as ModuleNodeData;
		const moduleId = moduleNodeData.extras.moduleReference?.moduleId;
		if (!moduleId) return;
		flattenModuleNodesStep(graphRegistry, moduleId);
	});
}

function copyModuleNodes(
	graphRegistry: GraphRegistry,
	oldModuleId: string,
	newModuleId: string,
	replacements: Map<string, string>,
) {
	graphRegistry.nodes
		.values()
		.filter((nodeData) => {
			return (
				nodeData.internalModuleId === oldModuleId &&
				nodeData.type !== 'ModuleNode' &&
				nodeData.type !== 'InputNode'
			);
		})
		.forEach((nodeData) => {
			const copy = structuredClone(nodeData);
			copy.id = createId();
			copy.internalModuleId = newModuleId;
			graphRegistry.nodes.add(copy);
			replacements.set(nodeData.id, copy.id);
		});
}

// Recursive, depth first
function flattenModuleNodesStep(graphRegistry: GraphRegistry, internalModuleId: string) {
	// Propagate until the leaf modules
	propagateFlattenModuleNodes(graphRegistry, internalModuleId);

	const replacements = new Map<string, string>();
	graphRegistry.nodes.values().forEach((nodeData) => {
		if (
			nodeData.internalModuleId === internalModuleId &&
			nodeData.type === 'ModuleNode' &&
			nodeData.extras.moduleReference?.moduleId
		) {
			copyModuleNodes(
				graphRegistry,
				nodeData.extras.moduleReference.moduleId,
				internalModuleId,
				replacements,
			);
			graphRegistry.nodes.remove(nodeData);
		}
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
}

export function flattenModuleNodes(graphRegistry: GraphRegistry) {
	graphRegistry.internalModules.values().forEach((internalModule) => {
		flattenModuleNodesStep(graphRegistry, internalModule.id);
	});
}
