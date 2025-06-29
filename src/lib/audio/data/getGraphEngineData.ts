import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import { getInternalModuleEngineData } from './getInternalModuleEngineData';
import type { GraphEngineData } from './GraphEngineData';
import { hashToUsize } from './hashToUsize';
import type { ModuleEngineData } from './ModuleEngineData';

// The external modules are converted to internal modules in
// `replaceExternalModulesByInternalModules`. this creates a soft dependency.
// This is complicated to handle.
//
// Ideally, there would be some other data structure where all the modules are
// "internal" and all the module nodes references would be plain ids. But I'm
// already having trouble naming `GraphRegistry`, let alone `GraphRegistryForm1`
// and `GraphRegistryForm2`!
export function getGraphEngineData(graphRegistry: GraphRegistry): GraphEngineData {
	const modules: ModuleEngineData[] = graphRegistry.internalModules
		.values()
		.map((internalModuleData) => getInternalModuleEngineData(graphRegistry, internalModuleData));

	return {
		modules,
		main_module_id: hashToUsize(graphRegistry.mainInternalModuleId),
	};
}
