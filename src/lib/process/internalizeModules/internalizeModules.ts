import type { GraphRegistry } from '$lib/data/GraphRegistry';
import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';
import { internalizeGraphParts } from './internalizeGraphParts';
import { internalizeModuleNodeModuleReferences } from './internalizeModuleNodeModuleReferences';

/**
 * Replace external modules by equivalent internal modules
 */
export function internalizeModules(
	graphRegistry: GraphRegistry,
	externalModulesData: ExternalModuleData[],
) {
	externalModulesData.map((externalModuleData) => {
		internalizeGraphParts(graphRegistry, externalModuleData.graph);
	});
	internalizeModuleNodeModuleReferences(graphRegistry, externalModulesData);
}
