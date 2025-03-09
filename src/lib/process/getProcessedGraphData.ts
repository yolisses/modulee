import type { GraphRegistry } from '$lib/data/GraphRegistry';
import { cloneGraphData } from './cloneGraphData';
import { addFallbackNodes } from './fallbackNodes/addFallbackNodes';
import { addImplicitNodes } from './implicitNodes/addImplicitNodes';

export function getProcessedGraphData(graphData: GraphRegistry) {
	const graphDataClone = cloneGraphData(graphData);
	addImplicitNodes(graphDataClone);
	addFallbackNodes(graphDataClone);
	return graphDataClone;
}
