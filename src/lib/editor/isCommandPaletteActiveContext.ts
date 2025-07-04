import { updateContext } from '$lib/shortcut/contextsContext';
import { setContext } from 'svelte';

export type IsCommandPaletteActiveContext = {
	isCommandPaletteActive: boolean;
};

export const isCommandPaletteActiveContextKey = Symbol('isCommandPaletteActiveContextKey');

export function setIsCommandPaletteActiveContext(
	isCommandPaletteActiveContext: IsCommandPaletteActiveContext,
) {
	setContext(isCommandPaletteActiveContextKey, isCommandPaletteActiveContext);
	updateContext(isCommandPaletteActiveContextKey);
}
