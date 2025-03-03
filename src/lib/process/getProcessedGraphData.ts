import type { GraphData } from '$lib/data/GraphData';
import { cloneGraphData } from './cloneGraphData';
import { addFallbackNodes } from './fallbackNodes/addFallbackNodes';
import { addImplicitNodes } from './implicitNodes/addImplicitNodes';

export function getProcessedGraphData(graphData: GraphData) {
	const graphDataClone = cloneGraphData(graphData);
	addImplicitNodes(graphDataClone);
	addFallbackNodes(graphDataClone);
	return graphDataClone;
}
