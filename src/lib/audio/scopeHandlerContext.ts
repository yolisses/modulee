import type { ScopeHandler } from '$lib/project/ui/ScopeHandler';
import { updateContext } from '$lib/shortcut/contextsContext';
import { setContext } from 'svelte';

export type ScopeHandlerContext = {
	scopeHandler?: ScopeHandler;
};

export const scopeHandlerContextKey = Symbol('scopeHandlerContextKey');

export function setScopeHandlerContext(scopeHandlerContext: ScopeHandlerContext) {
	setContext(scopeHandlerContextKey, scopeHandlerContext);
	updateContext(scopeHandlerContextKey);
}
