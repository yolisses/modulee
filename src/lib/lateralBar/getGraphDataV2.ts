import type { GraphDataV2 } from '$lib/data/GraphDataV2';
import type { GraphRegistry } from '$lib/data/GraphRegistry';

export function getGraphData(graphRegistry: GraphRegistry): GraphDataV2 {
	return {
		mainGroupId: graphRegistry.mainGroupId,
		nodes: graphRegistry.nodes.values(),
		groups: graphRegistry.groups.values(),
		connections: graphRegistry.connections.values(),
	};
}
