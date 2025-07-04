import { setContext } from 'svelte';
import type { ShortcutHandler } from './ShortcutHandler.svelte';
import { updateContext } from './contextsContext';

export type ShortcutHandlerContext = {
	shortcutHandler: ShortcutHandler;
};

export const shortcutHandlerContextKey = Symbol('shortcutHandlerContextKey');

export function setShortcutHandlerContext(shortcutHandlerContext: ShortcutHandlerContext) {
	setContext(shortcutHandlerContextKey, shortcutHandlerContext);
	updateContext(shortcutHandlerContextKey);
}
