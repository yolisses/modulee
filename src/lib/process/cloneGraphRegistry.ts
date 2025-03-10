import type { GraphRegistry } from '$lib/data/GraphRegistry';

export function cloneGraphRegistry(graphRegistry: GraphRegistry): GraphRegistry {
	return {
		mainInternalModuleId: graphRegistry.mainInternalModuleId,
		nodes: graphRegistry.nodes.clone(),
		internalModules: graphRegistry.internalModules.clone(),
		connections: graphRegistry.connections.clone(),
	};
}
