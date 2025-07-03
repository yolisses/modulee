import { getContextOrThrow } from '$lib/ui/getContextOrThrow';
import { setContext } from 'svelte';

export type IsCommandPaletteActiveContext = {
	isCommandPaletteActive: boolean;
};

export const isCommandPaletteActiveContextKey = Symbol('isCommandPaletteActiveContextKey');

export function setIsCommandPaletteActiveContext(
	isCommandPaletteActiveContext: IsCommandPaletteActiveContext,
) {
	setContext(isCommandPaletteActiveContextKey, isCommandPaletteActiveContext);
}

export function getRequiredContext(isCommandPaletteActiveContextKey) {
	return getContextOrThrow<IsCommandPaletteActiveContext>(isCommandPaletteActiveContextKey);
}
