import type { GraphData } from '$lib/data/GraphData';
import type { GraphRegistry } from '$lib/data/GraphRegistry';
import { ById } from '$lib/editor/ById';

export function getGraphRegistry(graphData: GraphData): GraphRegistry {
	const { nodes, connections, internalModules } = structuredClone(graphData);
	return {
		nodes: ById.fromItems(nodes),
		internalModules: ById.fromItems(internalModules),
		connections: ById.fromItems(connections),
		mainInternalModuleId: graphData.mainInternalModuleId,
	};
}
