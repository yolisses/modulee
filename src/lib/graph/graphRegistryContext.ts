import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import { setContext } from 'svelte';

export type GraphRegistryContext = {
	graphRegistry: GraphRegistry;
};

export const graphRegistryContextKey = Symbol('graphRegistryContextKey');

export function setGraphRegistryContext(graphRegistryContext: GraphRegistryContext) {
	setContext(graphRegistryContextKey, graphRegistryContext);
}
