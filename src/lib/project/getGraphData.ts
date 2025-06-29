import type { GraphData } from '$lib/graph/GraphData';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';

export function getGraphData(graphRegistry: GraphRegistry): GraphData {
	return {
		nodes: graphRegistry.nodes.values(),
		connections: graphRegistry.connections.values(),
		internalModules: graphRegistry.internalModules.values(),
		mainInternalModuleId: graphRegistry.mainInternalModuleId,
	};
}
