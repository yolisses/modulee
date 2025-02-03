import type { AudioBackend } from '$lib/engine/AudioBackend';
import { getContextOrThrow } from '$lib/ui/getContextOrThrow';
import { setContext } from 'svelte';

export type AudioBackendContext = {
	audioBackend?: AudioBackend;
};

const audioBackendContextKey = Symbol('audioBackendContextKey');

export function setAudioBackendContext(audioBackendContext: AudioBackendContext) {
	setContext(audioBackendContextKey, audioBackendContext);
}

export function getAudioBackendContext() {
	return getContextOrThrow<AudioBackendContext>(audioBackendContextKey);
}
