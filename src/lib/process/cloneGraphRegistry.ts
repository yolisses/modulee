import type { GraphRegistry } from '$lib/graph/GraphRegistry';

export function cloneGraphRegistry(graphRegistry: GraphRegistry): GraphRegistry {
	const { nodes, connections, externalModules, internalModules, mainInternalModuleId } =
		graphRegistry;
	return {
		nodes: nodes.structuredClone(),
		connections: connections.structuredClone(),
		mainInternalModuleId: mainInternalModuleId,
		externalModules: externalModules.structuredClone(),
		internalModules: internalModules.structuredClone(),
	};
}
