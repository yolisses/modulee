import type { GraphRegistry } from '$lib/data/GraphRegistry';
import { addFallbackNodeConnections } from './addNodeConnections';
import { createFallbackNode } from './createFallbackNode';

export function addFallbackNodes(graphRegistry: GraphRegistry) {
	graphRegistry.internalModules.values().forEach((internalModuleData) => {
		const fallbackNodeData = createFallbackNode(internalModuleData.id);
		graphRegistry.nodes.add(fallbackNodeData);
	});
	graphRegistry.nodes
		.values()
		.forEach((nodeData) => addFallbackNodeConnections(nodeData, graphRegistry));
}
