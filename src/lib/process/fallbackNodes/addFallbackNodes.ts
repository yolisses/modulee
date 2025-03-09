import type { GraphRegistry } from '$lib/data/GraphRegistry';
import { addFallbackNodeConnections } from './addNodeConnections';
import { createFallbackNode } from './createFallbackNode';

export function addFallbackNodes(graphData: GraphRegistry) {
	graphData.groups.values().forEach((groupData) => {
		const fallbackNodeData = createFallbackNode(groupData.id);
		graphData.nodes.add(fallbackNodeData);
	});
	graphData.nodes.values().forEach((nodeData) => addFallbackNodeConnections(nodeData, graphData));
}
