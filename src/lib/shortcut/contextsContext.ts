import { getContextOrThrow } from '$lib/ui/getContextOrThrow';
import { setContext } from 'svelte';
import type { Contexts } from './Contexts.svelte';

export type ContextsContext = {
	contexts: Contexts;
};

const contextsContextKey = Symbol('contextsContextKey');

export function setContextsContext(contextsContext: ContextsContext) {
	setContext(contextsContextKey, contextsContext);
}

// TODO check if that's a terrible idea that will cause all the components to
// update on every context update
export function getContextsContext() {
	return getContextOrThrow<ContextsContext>(contextsContextKey);
}
