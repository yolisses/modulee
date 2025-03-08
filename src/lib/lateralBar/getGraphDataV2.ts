import type { GraphData } from '$lib/data/GraphData';
import type { GraphDataV2 } from '$lib/data/GraphDataV2';

export function getGraphDataV2(graphData: GraphData): GraphDataV2 {
	return {
		mainGroupId: graphData.mainGroupId,
		nodes: graphData.nodes.values(),
		groups: graphData.groups.values(),
		connections: graphData.connections.values(),
	};
}
