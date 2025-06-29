import { ById } from '$lib/editor/ById';
import type { GraphData } from '$lib/graph/GraphData';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';

export function getGraphRegistry(
	graphData: GraphData,
	externalModulesData: ExternalModuleData[],
): GraphRegistry {
	const { nodes, connections, internalModules } = structuredClone(graphData);
	return {
		nodes: ById.fromItems(nodes),
		connections: ById.fromItems(connections),
		internalModules: ById.fromItems(internalModules),
		externalModules: ById.fromItems(externalModulesData),
		mainInternalModuleId: graphData.mainInternalModuleId,
	};
}
