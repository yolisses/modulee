import type { GraphRegistry } from '$lib/data/GraphRegistry';
import type { ExternalModuleData } from '$lib/module/ExternalModuleData';
import { getExternalModuleEngineData } from './getExternalModuleData';
import { getInternalModuleEngineData } from './getInternalModuleEngineData';
import type { GraphEngineData } from './GraphEngineData';
import { hashToUsize } from './hashToUsize';
import type { ModuleEngineData } from './ModuleEngineData';

export function getGraphEngineData(
	graphRegistry: GraphRegistry,
	externalModulesData: ExternalModuleData[],
): GraphEngineData {
	const modules: ModuleEngineData[] = graphRegistry.internalModules
		.values()
		.map((internalModuleData) => getInternalModuleEngineData(graphRegistry, internalModuleData));

	externalModulesData.forEach((externalModuleData) => {
		const modulesEngineData = getExternalModuleEngineData(graphRegistry, externalModuleData);
		modules.push(...modulesEngineData);
	});

	return {
		modules,
		main_module_id: hashToUsize(graphRegistry.mainInternalModuleId),
	};
}
