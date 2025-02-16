import type { GraphData } from '$lib/data/GraphData';
import { addFallbackNodes } from './addFallbackNodes';

export function getProcessedGraphData(graphData: GraphData) {
	const graphDataClone = structuredClone(graphData);
	addFallbackNodes(graphDataClone);
	return graphDataClone;
}
