import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';
import { addAutoNodes } from './autoNodes/addAutoNodes';
import { cloneGraphRegistry } from './cloneGraphRegistry';
import { addControlNodes } from './fallbackNodes/addControlNodes';
import { removeConnectionsToMissingNodes } from './fallbackNodes/removeConnectionsToMissingNodes';
import { internalizeModules } from './internalizeModules/internalizeModules';
import { removeReferencesToMissingModules } from './removeReferencesToMissingModules/removeReferencesToMissingModules';
import { replaceAudioInputNodes } from './replaceAudioInputNodes/replaceAudioInputNodes';

export function getProcessedGraphRegistry(
	graphRegistry: GraphRegistry,
	externalModulesData: ExternalModuleData[],
) {
	// Uses clones to avoid hard to debug bugs in other parts of the system
	graphRegistry = cloneGraphRegistry(graphRegistry);
	externalModulesData = structuredClone(externalModulesData);

	internalizeModules(graphRegistry, externalModulesData);
	removeReferencesToMissingModules(graphRegistry);
	removeConnectionsToMissingNodes(graphRegistry);
	replaceAudioInputNodes(graphRegistry);
	addAutoNodes(graphRegistry);
	addControlNodes(graphRegistry);
	return graphRegistry;
}
