import type { GraphRegistry } from '$lib/data/GraphRegistry';
import { addFallbackNodeConnections } from './addNodeConnections';
import { createFallbackNode } from './createFallbackNode';

export function addFallbackNodes(graphRegistry: GraphRegistry) {
	graphRegistry.groups.values().forEach((groupData) => {
		const fallbackNodeData = createFallbackNode(groupData.id);
		graphRegistry.nodes.add(fallbackNodeData);
	});
	graphRegistry.nodes
		.values()
		.forEach((nodeData) => addFallbackNodeConnections(nodeData, graphRegistry));
}
