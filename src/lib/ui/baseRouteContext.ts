import { updateContext } from '$lib/shortcut/contextsContext';
import { setContext } from 'svelte';

export type BaseRouteContext = {
	baseRoute: string;
};

export const baseRouteContextKey = Symbol('baseRouteContextKey');

export function setBaseRouteContext(baseRouteContext: BaseRouteContext) {
	setContext(baseRouteContextKey, baseRouteContext);
	updateContext(baseRouteContextKey);
}
