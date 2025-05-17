import type { GraphRegistry } from '$lib/data/GraphRegistry';
import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';
import { cloneGraphRegistry } from './cloneGraphRegistry';
import { addControlNodes } from './fallbackNodes/addControlNodes';
import { addFallbackNodes } from './fallbackNodes/addFallbackNodes';
import { removeConnectionsToMissingNodes } from './fallbackNodes/removeConnectionsToMissingNodes';
import { addImplicitNodes } from './implicitNodes/addImplicitNodes';
import { internalizeModules } from './internalizeModules/internalizeModules';

export function getProcessedGraphRegistry(
	graphRegistry: GraphRegistry,
	externalModulesData: ExternalModuleData[],
) {
	// Uses clones to avoid hard to debug bugs in other parts of the system
	graphRegistry = cloneGraphRegistry(graphRegistry);
	externalModulesData = structuredClone(externalModulesData);

	internalizeModules(graphRegistry, externalModulesData);
	removeConnectionsToMissingNodes(graphRegistry);
	addImplicitNodes(graphRegistry);
	addControlNodes(graphRegistry);
	addFallbackNodes(graphRegistry);
	return graphRegistry;
}
