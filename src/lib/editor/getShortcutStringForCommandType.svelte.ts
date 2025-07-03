import { getRequiredContext } from '$lib/global/getRequiredContext';
import { shortcutHandlerContextKey } from '$lib/shortcut/shortcutHandlerContext';

export function getShortcutStringForCommandType(commandType: string) {
	const shortcutHandlerContext = getRequiredContext(shortcutHandlerContextKey);
	const shortcutString =
		shortcutHandlerContext.shortcutHandler.getShortcutStringForCommandType(commandType);
	return shortcutString;
}
