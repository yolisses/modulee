import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';
import { getGraphRegistry } from '$lib/project/getGraphRegistry';
import { getInternalModuleEngineData } from './getInternalModuleEngineData';
import type { ModuleEngineData } from './ModuleEngineData';

export function getExternalModuleEngineData(
	externalModuleData: ExternalModuleData,
): ModuleEngineData[] {
	const graphData = externalModuleData.graph;
	const graphRegistry = getGraphRegistry(graphData);
	return graphData.internalModules.map((internalModuleData) => {
		return getInternalModuleEngineData(graphRegistry, internalModuleData);
	});
}
