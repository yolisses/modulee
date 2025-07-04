import type { ContextsByKey } from '$lib/global/ContextsByKey';
import { getRequiredContext } from '$lib/global/getRequiredContext';
import { setContext } from 'svelte';
import type { Contexts } from './Contexts.svelte';

export type ContextsContext = {
	contexts: Contexts;
};

export const contextsContextKey = Symbol('contextsContextKey');

export function setContextsContext(contextsContext: ContextsContext) {
	setContext(contextsContextKey, contextsContext);
	updateContext(contextsContextKey);
}

export function updateContext<T extends keyof ContextsByKey>(key: T) {
	const contextsContext = getRequiredContext(contextsContextKey);
	contextsContext.contexts.updateContext(key);
}
