import { updateContext } from '$lib/shortcut/contextsContext';
import { setContext } from 'svelte';

export type IsMutedContext = {
	isMuted: boolean;
};

export const isMutedContextKey = Symbol('isMutedContextKey');

export function setIsMutedContext(isMutedContext: IsMutedContext) {
	setContext(isMutedContextKey, isMutedContext);
	updateContext(isMutedContextKey);
}
