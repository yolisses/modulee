import type { GraphRegistry } from '$lib/data/GraphRegistry';

export function cloneGraphData(graphData: GraphRegistry): GraphRegistry {
	return {
		mainGroupId: graphData.mainGroupId,
		nodes: graphData.nodes.clone(),
		groups: graphData.groups.clone(),
		connections: graphData.connections.clone(),
	};
}
