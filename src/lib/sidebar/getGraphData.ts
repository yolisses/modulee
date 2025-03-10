import type { GraphData } from '$lib/data/GraphData';
import type { GraphRegistry } from '$lib/data/GraphRegistry';

export function getGraphData(graphRegistry: GraphRegistry): GraphData {
	return {
		mainInternalModuleId: graphRegistry.mainInternalModuleId,
		nodes: graphRegistry.nodes.values(),
		internalModules: graphRegistry.internalModules.values(),
		connections: graphRegistry.connections.values(),
	};
}
