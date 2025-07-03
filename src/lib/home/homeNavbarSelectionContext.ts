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
