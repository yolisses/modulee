import type { GraphData } from '$lib/data/GraphData';
import type { GraphRegistry } from '$lib/data/GraphRegistry';
import { ById } from '$lib/editor/ById';

export function getGraphRegistry(graphData: GraphData): GraphRegistry {
	const { nodes, connections, internalModules, externalModuleReferences } =
		structuredClone(graphData);
	return {
		nodes: ById.fromItems(nodes),
		connections: ById.fromItems(connections),
		internalModules: ById.fromItems(internalModules),
		mainInternalModuleId: graphData.mainInternalModuleId,
		externalModuleReferences: ById.fromItems(externalModuleReferences),
	};
}
