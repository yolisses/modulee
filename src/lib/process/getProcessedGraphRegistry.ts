import type { GraphRegistry } from '$lib/data/GraphRegistry';
import type { ExternalModuleData } from '$lib/module/ExternalModuleData';
import { cloneGraphRegistry } from './cloneGraphRegistry';
import { addFallbackNodes } from './fallbackNodes/addFallbackNodes';
import { addImplicitNodes } from './implicitNodes/addImplicitNodes';
import { internalizeModules } from './internalizeModules/internalizeModules';

export function getProcessedGraphRegistry(
	graphRegistry: GraphRegistry,
	externalModulesData: ExternalModuleData[],
) {
	// Uses clones to avoid hard to debug bugs in other parts of the system
	const graphRegistryClone = cloneGraphRegistry(graphRegistry);
	const externalModulesDataClone = structuredClone(externalModulesData);

	internalizeModules(graphRegistryClone, externalModulesDataClone);
	addImplicitNodes(graphRegistryClone);
	addFallbackNodes(graphRegistryClone);
	return graphRegistryClone;
}
