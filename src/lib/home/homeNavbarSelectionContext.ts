import { getContextOrThrow } from '$lib/ui/getContextOrThrow';
import { setContext } from 'svelte';

export type HomeNavbarSelectionContext = {
	homeNavbarSelection: string;
};

export const homeNavbarSelectionContextKey = Symbol('homeNavbarSelectionContextKey');

export function setHomeNavbarSelectionContext(
	homeNavbarSelectionContext: HomeNavbarSelectionContext,
) {
	setContext(homeNavbarSelectionContextKey, homeNavbarSelectionContext);
}

export function getHomeNavbarSelectionContext() {
	return getContextOrThrow<HomeNavbarSelectionContext>(homeNavbarSelectionContextKey);
}
