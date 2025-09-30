import type { OscilloscopeBackend } from '$lib/project/ui/OscilloscopeBackend';
import { updateContext } from '$lib/shortcut/contextsContext';
import { setContext } from 'svelte';

export type OscilloscopeBackendContext = {
	oscilloscopeBackend?: OscilloscopeBackend;
};

export const oscilloscopeBackendContextKey = Symbol('oscilloscopeBackendContextKey');

export function setOscilloscopeBackendContext(
	oscilloscopeBackendContext: OscilloscopeBackendContext,
) {
	setContext(oscilloscopeBackendContextKey, oscilloscopeBackendContext);
	updateContext(oscilloscopeBackendContextKey);
}
