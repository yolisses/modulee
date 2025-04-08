import {
	type IsCommandPaletteActiveContext,
	setIsCommandPaletteActiveContext,
} from '$lib/editor/isCommandPaletteActiveContext';

export function setMenuVisibilityContexts() {
	const isCommandPaletteActiveContext: IsCommandPaletteActiveContext = $state({
		isCommandPaletteActive: false,
	});
	setIsCommandPaletteActiveContext(isCommandPaletteActiveContext);
}
