import { updateContext } from '$lib/shortcut/contextsContext';
import { setContext } from 'svelte';
import type { OscilloscopeBackend } from './OscilloscopeBackend';

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
