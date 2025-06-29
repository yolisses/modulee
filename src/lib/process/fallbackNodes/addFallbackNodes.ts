import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import { addFallbackNodeConnections } from './addNodeConnections';
import { createFallbackNode } from './createFallbackNode';

/**
 * Creates constant nodes with the value 0 for every input not connected.
 */
export function addFallbackNodes(graphRegistry: GraphRegistry) {
	graphRegistry.internalModules.values().forEach((internalModuleData) => {
		const fallbackNodeData = createFallbackNode(internalModuleData.id);
		graphRegistry.nodes.add(fallbackNodeData);
	});
	graphRegistry.nodes
		.values()
		.forEach((nodeData) => addFallbackNodeConnections(nodeData, graphRegistry));
}
