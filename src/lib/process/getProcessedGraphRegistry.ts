import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import { getGraphData } from '$lib/project/getGraphData';
import { addAutoNodes } from './autoNodes/addAutoNodes';
import { cloneGraphRegistry } from './cloneGraphRegistry';
import { addControlNodes } from './fallbackNodes/addControlNodes';
import { removeConnectionsToMissingNodes } from './fallbackNodes/removeConnectionsToMissingNodes';
import { flattenModuleNodes } from './flattenModuleNodes/flattenModuleNodes';
import { internalizeModules } from './internalizeModules/internalizeModules';
import { removeReferencesToMissingModules } from './removeReferencesToMissingModules/removeReferencesToMissingModules';
import { replaceAudioInputNodes } from './replaceAudioInputNodes/replaceAudioInputNodes';

export function getProcessedGraphRegistry(graphRegistry: GraphRegistry) {
	// Uses clones since graphRegistry is mutated
	graphRegistry = cloneGraphRegistry(graphRegistry);

	internalizeModules(graphRegistry);
	removeReferencesToMissingModules(graphRegistry);
	removeConnectionsToMissingNodes(graphRegistry);
	replaceAudioInputNodes(graphRegistry);
	addAutoNodes(graphRegistry);
	addControlNodes(graphRegistry);
	// DEBUG all comments
	// downloadJson(getGraphData(graphRegistry), 'graphData before.json');
	flattenModuleNodes(graphRegistry);
	// makeStereo(graphRegistry);
	// downloadJson(getGraphData(graphRegistry), 'graphData after.json');
	console.log(getGraphData(graphRegistry));
	return graphRegistry;
}
