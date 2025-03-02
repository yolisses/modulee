import type { GraphData } from '$lib/data/GraphData';
import { getContextOrThrow } from '$lib/ui/getContextOrThrow';
import { setContext } from 'svelte';

export type GraphDataContext = {
	graphData: GraphData;
};

const graphDataContextKey = Symbol('graphDataContextKey');

export function setGraphDataContext(graphDataContext: GraphDataContext) {
	setContext(graphDataContextKey, graphDataContext);
}

export function getGraphDataContext() {
	return getContextOrThrow<GraphDataContext>(graphDataContextKey);
}
