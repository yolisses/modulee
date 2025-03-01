import type { GraphData } from '$lib/data/GraphData';
import { addFallbackNodeConnections } from './addNodeConnections';
import { createFallbackNode } from './createFallbackNode';

export function addFallbackNodes(graphData: GraphData) {
	graphData.groups.values().forEach((groupData) => {
		const fallbackNodeData = createFallbackNode(groupData.id);
		graphData.nodes.add(fallbackNodeData);
	});
	graphData.nodes.values().forEach((nodeData) => addFallbackNodeConnections(nodeData, graphData));
}
