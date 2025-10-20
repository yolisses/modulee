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
		const newOriginNodeId = replacements.get(connectionData.inputPath.nodeId);
		const newTargetNodeId = replacements.get(connectionData.targetNodeId);
		const originNode = graphRegistry.nodes.get(connectionData.inputPath.nodeId);
		const targetNode = graphRegistry.nodes.get(connectionData.targetNodeId);
		/*
		Cases:
		- from input node	-> delete, not used
		- from output node	-> delete
		- from module node	-> delete
		- to input node	-> replace input node by external node
 		- to output node	-> replace by output node target
		- to module node	-> replace module node by the node connected to output node
		- between remaining internal nodes	-> duplicate
		*/
		if (originNode.type === 'InputNode') {
			return;
		} else if (newTargetNodeId && newOriginNodeId) {
			const copy = structuredClone(connectionData);
			copy.id = createId();
			copy.targetNodeId = newTargetNodeId;
			copy.inputPath.nodeId = newOriginNodeId;
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
