import type { OscilloscopeHandler } from '$lib/project/ui/OscilloscopeHandler';
import { updateContext } from '$lib/shortcut/contextsContext';
import { setContext } from 'svelte';

export type OscilloscopeHandlerContext = {
	oscilloscopeHandler?: OscilloscopeHandler;
};

export const oscilloscopeHandlerContextKey = Symbol('oscilloscopeHandlerContextKey');

export function setOscilloscopeHandlerContext(
	oscilloscopeHandlerContext: OscilloscopeHandlerContext,
) {
	setContext(oscilloscopeHandlerContextKey, oscilloscopeHandlerContext);
	updateContext(oscilloscopeHandlerContextKey);
}
