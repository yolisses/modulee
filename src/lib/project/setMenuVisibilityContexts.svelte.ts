import {
	type IsCommandPaletteActiveContext,
	setIsCommandPaletteActiveContext,
} from '$lib/editor/isCommandPaletteActiveContext';
import { setIsSidebarVisibleContext } from '$lib/sidebar/isSidebarVisibleContext';

export function setMenuVisibilityContexts() {
	const isSidebarVisibleContext = $state({ isSidebarVisible: false });
	setIsSidebarVisibleContext(isSidebarVisibleContext);

	const isCommandPaletteActiveContext: IsCommandPaletteActiveContext = $state({
		isCommandPaletteActive: false,
	});
	setIsCommandPaletteActiveContext(isCommandPaletteActiveContext);
}
