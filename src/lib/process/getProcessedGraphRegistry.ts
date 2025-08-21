import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import { cloneGraphRegistry } from './cloneGraphRegistry';
import { addControlNodes } from './fallbackNodes/addControlNodes';
import { removeConnectionsToMissingNodes } from './fallbackNodes/removeConnectionsToMissingNodes';
import { internalizeModules } from './internalizeModules/internalizeModules';
import { makeStereo } from './makeStereo/makeStereo';
import { removeReferencesToMissingModules } from './removeReferencesToMissingModules/removeReferencesToMissingModules';
import { replaceAudioInputNodes } from './replaceAudioInputNodes/replaceAudioInputNodes';

export function getProcessedGraphRegistry(graphRegistry: GraphRegistry) {
	// Uses clones to avoid hard to debug bugs in other parts of the system
	graphRegistry = cloneGraphRegistry(graphRegistry);

	internalizeModules(graphRegistry);
	removeReferencesToMissingModules(graphRegistry);
	removeConnectionsToMissingNodes(graphRegistry);
	replaceAudioInputNodes(graphRegistry);
	// addAutoNodes(graphRegistry);
	addControlNodes(graphRegistry);
	makeStereo(graphRegistry);
	console.log(graphRegistry);

	return graphRegistry;
}
