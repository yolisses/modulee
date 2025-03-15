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

export function getContextsContext() {
	return getContextOrThrow<ContextsContext>(contextsContextKey);
}
