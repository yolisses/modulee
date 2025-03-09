import type { GraphRegistry } from '$lib/data/GraphRegistry';

export function cloneGraphRegistry(graphRegistry: GraphRegistry): GraphRegistry {
	return {
		mainGroupId: graphRegistry.mainGroupId,
		nodes: graphRegistry.nodes.clone(),
		groups: graphRegistry.groups.clone(),
		connections: graphRegistry.connections.clone(),
	};
}
