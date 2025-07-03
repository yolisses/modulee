import { getContextOrThrow } from '$lib/ui/getContextOrThrow';
import { setContext } from 'svelte';

export type BaseRouteContext = {
	baseRoute: string;
};

export const baseRouteContextKey = Symbol('baseRouteContextKey');

export function setBaseRouteContext(baseRouteContext: BaseRouteContext) {
	setContext(baseRouteContextKey, baseRouteContext);
}

export function getBaseRouteContext() {
	return getContextOrThrow<BaseRouteContext>(baseRouteContextKey);
}
