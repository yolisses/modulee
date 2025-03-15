import type { GraphRegistry } from '$lib/data/GraphRegistry';
import type { ExternalModuleData } from '$lib/module/ExternalModuleData';
import { getInternalModuleEngineData } from './getInternalModuleEngineData';
import type { ModuleEngineData } from './ModuleEngineData';

export function getExternalModuleEngineData(
	graphRegistry: GraphRegistry,
	externalModuleData: ExternalModuleData,
): ModuleEngineData[] {
	console.log(externalModuleData);
	return externalModuleData.graph.internalModules.map((internalModuleData) => {
		return getInternalModuleEngineData(graphRegistry, internalModuleData);
	});
}
