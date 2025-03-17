import type { GraphRegistry } from '$lib/data/GraphRegistry';

export function cloneGraphRegistry(graphRegistry: GraphRegistry): GraphRegistry {
	const { mainInternalModuleId, connections, externalModuleReferences, internalModules, nodes } =
		graphRegistry;
	return {
		nodes: nodes.structuredClone(),
		connections: connections.structuredClone(),
		mainInternalModuleId: mainInternalModuleId,
		internalModules: internalModules.structuredClone(),
		externalModuleReferences: externalModuleReferences.structuredClone(),
	};
}
