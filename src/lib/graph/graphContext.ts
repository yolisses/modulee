import { updateContext } from '$lib/shortcut/contextsContext';
import { setContext } from 'svelte';
import type { Graph } from './Graph.svelte';

export type GraphContext = {
	graph: Graph;
};

export const graphContextKey = Symbol('graphContextKey');

export function setGraphContext(graphContext: GraphContext) {
	setContext(graphContextKey, graphContext);
	updateContext(graphContextKey);
}
