import type { GraphDataV2 } from '$lib/data/GraphDataV2';
import type { GraphRegistry } from '$lib/data/GraphRegistry';

export function getGraphDataV2(graphData: GraphRegistry): GraphDataV2 {
	return {
		mainGroupId: graphData.mainGroupId,
		nodes: graphData.nodes.values(),
		groups: graphData.groups.values(),
		connections: graphData.connections.values(),
	};
}
