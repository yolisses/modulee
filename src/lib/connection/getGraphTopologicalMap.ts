import type { Graph } from '$lib/data/Graph.svelte';
import type { TopologicalMap } from './TopologicalMap';

export function getGraphTopologicalMap(graph: Graph) {
	const topologicalMap: TopologicalMap = new Map();
	const { nodes, connections } = graph;
	nodes.ids().forEach((nodeId) => {
		topologicalMap.set(nodeId, []);
	});
	connections.values().forEach((connectionData) => {
		const {
			targetNodeId,
			inputPath: { nodeId: originNodeId },
		} = connectionData;
		if (!nodes.containsId(targetNodeId)) return;
		if (!nodes.containsId(originNodeId)) return;
		topologicalMap.get(originNodeId)?.push(targetNodeId);
	});
	return topologicalMap;
}
