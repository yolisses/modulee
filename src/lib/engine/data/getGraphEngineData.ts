import type { GraphRegistry } from '$lib/data/GraphRegistry';
import { getInternalModuleEngineData } from './getInternalModuleEngineData';
import type { GraphEngineData } from './GraphEngineData';
import { hashToUsize } from './hashToUsize';

export function getGraphEngineData(graphRegistry: GraphRegistry): GraphEngineData {
	return {
		main_internalModule_id: graphRegistry
			? hashToUsize(graphRegistry.mainInternalModuleId)
			: undefined,
		internalModules: graphRegistry.internalModules
			.values()
			.map((internalModuleData) => getInternalModuleEngineData(internalModuleData, graphRegistry)),
	};
}
