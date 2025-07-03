import type { AudioBackend } from '$lib/audio/AudioBackend';
import { getContextOrThrow } from '$lib/ui/getContextOrThrow';
import { setContext } from 'svelte';

export type AudioBackendContext = {
	audioBackend?: AudioBackend;
};

export const audioBackendContextKey = Symbol('audioBackendContextKey');

export function setAudioBackendContext(audioBackendContext: AudioBackendContext) {
	setContext(audioBackendContextKey, audioBackendContext);
}

export function getAudioBackendContext() {
	return getContextOrThrow<AudioBackendContext>(audioBackendContextKey);
}
