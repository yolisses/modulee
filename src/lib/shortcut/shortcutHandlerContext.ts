import { getContextOrThrow } from '$lib/ui/getContextOrThrow';
import { setContext } from 'svelte';
import type { ShortcutHandler } from './ShortcutHandler.svelte';

export type ShortcutHandlerContext = {
	shortcutHandler: ShortcutHandler;
};

export const shortcutHandlerContextKey = Symbol('shortcutHandlerContextKey');

export function setShortcutHandlerContext(shortcutHandlerContext: ShortcutHandlerContext) {
	setContext(shortcutHandlerContextKey, shortcutHandlerContext);
}

export function getRequiredContext(shortcutHandlerContextKey) {
	return getContextOrThrow<ShortcutHandlerContext>(shortcutHandlerContextKey);
}
