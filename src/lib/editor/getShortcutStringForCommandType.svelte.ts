export function getShortcutStringForCommandType(commandType: string) {
	const shortcutHandlerContext = getRequiredContext(shortcutHandlerContextKey);
	const shortcutString =
		shortcutHandlerContext.shortcutHandler.getShortcutStringForCommandType(commandType);
	return shortcutString;
}
