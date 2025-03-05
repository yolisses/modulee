import { getShortcutHandlerContext } from '$lib/shortcut/shortcutHandlerContext';

export function getShortcutStringForCommandType(commandType: string) {
	const shortcutHandlerContext = getShortcutHandlerContext();
	const shortcutString =
		shortcutHandlerContext.shortcutHandler.getShortcutStringForCommandType(commandType);
	return shortcutString;
}
