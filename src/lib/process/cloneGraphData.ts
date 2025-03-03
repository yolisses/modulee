import type { GraphData } from '$lib/data/GraphData';

export function cloneGraphData(graphData: GraphData): GraphData {
	return {
		mainGroupId: graphData.mainGroupId,
		nodes: graphData.nodes.clone(),
		groups: graphData.groups.clone(),
		connections: graphData.connections.clone(),
	};
}
