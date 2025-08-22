import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import { cloneGraphRegistry } from './cloneGraphRegistry';
import { addControlNodes } from './fallbackNodes/addControlNodes';
import { removeConnectionsToMissingNodes } from './fallbackNodes/removeConnectionsToMissingNodes';
import { internalizeModules } from './internalizeModules/internalizeModules';
import { makeStereo } from './makeStereo/makeStereo';
import { removeReferencesToMissingModules } from './removeReferencesToMissingModules/removeReferencesToMissingModules';
import { replaceAudioInputNodes } from './replaceAudioInputNodes/replaceAudioInputNodes';

export function getProcessedGraphRegistry(graphRegistry: GraphRegistry) {
	// Uses clones since graphRegistry is mutated
	graphRegistry = cloneGraphRegistry(graphRegistry);

	internalizeModules(graphRegistry);
	removeReferencesToMissingModules(graphRegistry);
	removeConnectionsToMissingNodes(graphRegistry);
	replaceAudioInputNodes(graphRegistry);
	// DEBUG
	// addAutoNodes(graphRegistry);
	addControlNodes(graphRegistry);
	makeStereo(graphRegistry);
	console.log(graphRegistry);

	return graphRegistry;
}
