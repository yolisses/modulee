import {
	type IsCommandPaletteActiveContext,
	setIsCommandPaletteActiveContext,
} from '$lib/editor/isCommandPaletteActiveContext';
import { setIsSidebarVisibleContext } from '$lib/sidebar/isSidebarVisibleContext';
import { setSelectedTabContext } from '$lib/sidebar/selectedTabContext';

export function setMenuVisibilityContexts() {
	const isSidebarVisibleContext = $state({ isSidebarVisible: true });
	setIsSidebarVisibleContext(isSidebarVisibleContext);

	const selectedTabContext = $state({ selectedTab: 'project' });
	setSelectedTabContext(selectedTabContext);

	const isCommandPaletteActiveContext: IsCommandPaletteActiveContext = $state({
		isCommandPaletteActive: false,
	});
	setIsCommandPaletteActiveContext(isCommandPaletteActiveContext);
}
