import type { GraphRegistry } from '$lib/data/GraphRegistry';

export function cloneGraphRegistry(graphRegistry: GraphRegistry): GraphRegistry {
	const { mainInternalModuleId, connections, externalModuleReferences, internalModules, nodes } =
		graphRegistry;
	return {
		nodes: nodes.clone(),
		connections: connections.clone(),
		internalModules: internalModules.clone(),
		mainInternalModuleId: mainInternalModuleId,
		externalModuleReferences: externalModuleReferences.clone(),
	};
}
