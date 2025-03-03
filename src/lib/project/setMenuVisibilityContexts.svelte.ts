import {
	type IsCommandPaletteActiveContext,
	setIsCommandPaletteActiveContext,
} from '$lib/CommandPalette/isCommandPaletteActiveContext';
import { setIsLateralBarVisibleContext } from '$lib/lateralBar/isLateralBarVisibleContext';

export function setMenuVisibilityContexts() {
	const isLateralBarVisibleContext = $state({ isLateralBarVisible: false });
	setIsLateralBarVisibleContext(isLateralBarVisibleContext);

	const isCommandPaletteActiveContext: IsCommandPaletteActiveContext = $state({
		isCommandPaletteActive: false,
	});
	setIsCommandPaletteActiveContext(isCommandPaletteActiveContext);
}
