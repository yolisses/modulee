import type { GraphData } from '$lib/data/GraphData';
import type { GraphRegistry } from '$lib/data/GraphRegistry';

export function getGraphData(graphRegistry: GraphRegistry): GraphData {
	return {
		mainGroupId: graphRegistry.mainGroupId,
		nodes: graphRegistry.nodes.values(),
		groups: graphRegistry.groups.values(),
		connections: graphRegistry.connections.values(),
	};
}
