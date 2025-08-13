import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import { internalizeGraphParts } from './internalizeGraphParts';
import { internalizeModuleNodeModuleReferences } from './internalizeModuleNodeModuleReferences';

/**
 * Replace external modules by equivalent internal modules
 */
export function internalizeModules(graphRegistry: GraphRegistry) {
	graphRegistry.externalModules.values().map((externalModuleData) => {
		internalizeGraphParts(graphRegistry, externalModuleData.graph);
	});
	internalizeModuleNodeModuleReferences(graphRegistry);
}
