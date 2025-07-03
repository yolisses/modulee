import { getContextOrThrow } from '$lib/ui/getContextOrThrow';
import { getContext, setContext } from 'svelte';

export type Dev2Context = {
	dev2: number;
};

export const dev2ContextKey = Symbol('dev2ContextKey');

export function setDev2Context(dev2Context: Dev2Context) {
	setContext(dev2ContextKey, dev2Context);
}

export function getRequiredContext(dev2ContextKey) {
	return getContextOrThrow<Dev2Context>(dev2ContextKey);
}

export function getDev2ContextOrUndefined() {
	return getContext(dev2ContextKey) as Dev2Context | undefined;
}
