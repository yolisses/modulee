import type { GraphRegistry } from '$lib/data/GraphRegistry';
import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';
import { cloneGraphRegistry } from './cloneGraphRegistry';
import { addFallbackNodes } from './fallbackNodes/addFallbackNodes';
import { removeMissingNodeReferences } from './fallbackNodes/removeMissingNodeReferences';
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
	removeMissingNodeReferences(graphRegistry);
	addImplicitNodes(graphRegistry);
	addFallbackNodes(graphRegistry);
	return graphRegistry;
}
