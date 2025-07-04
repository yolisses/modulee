import type { AudioBackend } from '$lib/audio/AudioBackend';
import { updateContext } from '$lib/shortcut/contextsContext';
import { setContext } from 'svelte';

export type AudioBackendContext = {
	audioBackend?: AudioBackend;
};

export const audioBackendContextKey = Symbol('audioBackendContextKey');

export function setAudioBackendContext(audioBackendContext: AudioBackendContext) {
	setContext(audioBackendContextKey, audioBackendContext);
	updateContext(audioBackendContextKey);
}
