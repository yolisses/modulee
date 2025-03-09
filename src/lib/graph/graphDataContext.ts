import type { GraphRegistry } from '$lib/data/GraphRegistry';
import { getContextOrThrow } from '$lib/ui/getContextOrThrow';
import { setContext } from 'svelte';

export type GraphDataContext = {
	graphData: GraphRegistry;
};

const graphDataContextKey = Symbol('graphDataContextKey');

export function setGraphDataContext(graphDataContext: GraphDataContext) {
	setContext(graphDataContextKey, graphDataContext);
}

export function getGraphDataContext() {
	return getContextOrThrow<GraphDataContext>(graphDataContextKey);
}
