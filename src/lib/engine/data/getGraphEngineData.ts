import type { GraphRegistry } from '$lib/data/GraphRegistry';
import { getInternalModuleEngineData } from './getInternalModuleEngineData';
import type { GraphEngineData } from './GraphEngineData';
import { hashToUsize } from './hashToUsize';

export function getGraphEngineData(graphRegistry: GraphRegistry): GraphEngineData {
	return {
		main_module_id: hashToUsize(graphRegistry.mainInternalModuleId),
		modules: graphRegistry.internalModules
			.values()
			.map((internalModuleData) => getInternalModuleEngineData(internalModuleData, graphRegistry)),
	};
}
