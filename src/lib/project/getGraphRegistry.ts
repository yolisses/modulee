import type { GraphData } from '$lib/data/GraphData';
import type { GraphRegistry } from '$lib/data/GraphRegistry';
import { ById } from '$lib/editor/ById';
import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';

export function getGraphRegistry(
	graphData: GraphData,
	externalModulesData: ExternalModuleData[],
): GraphRegistry {
	const { nodes, connections, internalModules, externalModuleReferences } =
		structuredClone(graphData);
	return {
		nodes: ById.fromItems(nodes),
		connections: ById.fromItems(connections),
		internalModules: ById.fromItems(internalModules),
		externalModules: ById.fromItems(externalModulesData),
		mainInternalModuleId: graphData.mainInternalModuleId,
		externalModuleReferences: ById.fromItems(externalModuleReferences),
	};
}
