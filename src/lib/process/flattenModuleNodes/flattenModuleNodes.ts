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

function copyModuleConnections(graphRegistry: GraphRegistry, replacements: Map<string, string>) {
	graphRegistry.connections.values().forEach((connectionData) => {
		const targetNodeId = replacements.get(connectionData.targetNodeId);
		const originNodeId = replacements.get(connectionData.inputPath.nodeId);
		/*
		Cases:
		- to input node	-> replace input node by external node
 		- from output node	-> delete
		- to module node	-> replace module node by the node connected to output node
		- between remaining internal nodes	-> duplicate
		*/
		if (targetNodeId && originNodeId) {
			const copy = structuredClone(connectionData);
			copy.id = createId();
			copy.targetNodeId = targetNodeId;
			copy.inputPath.nodeId = originNodeId;
			graphRegistry.connections.add(copy);
		}
	});
}

// Recursive, depth first
function flattenModuleNodesStep(graphRegistry: GraphRegistry, internalModuleId: string) {
	// Propagate until the leaf modules
	propagateFlattenModuleNodes(graphRegistry, internalModuleId);

	graphRegistry.nodes.values().forEach((nodeData) => {
		if (
			nodeData.internalModuleId === internalModuleId &&
			nodeData.type === 'ModuleNode' &&
			nodeData.extras.moduleReference?.moduleId
		) {
			const replacements = new Map<string, string>();
			copyModuleNodes(
				graphRegistry,
				nodeData.extras.moduleReference.moduleId,
				internalModuleId,
				replacements,
			);
			copyModuleConnections(graphRegistry, replacements);
			graphRegistry.nodes.remove(nodeData);
		}
	});
}

export function flattenModuleNodes(graphRegistry: GraphRegistry) {
	graphRegistry.internalModules.values().forEach((internalModule) => {
		flattenModuleNodesStep(graphRegistry, internalModule.id);
	});
}
