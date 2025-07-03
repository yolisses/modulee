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

export function getRequiredContext(homeNavbarSelectionContextKey) {
	return getContextOrThrow<HomeNavbarSelectionContext>(homeNavbarSelectionContextKey);
}
