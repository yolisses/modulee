import { updateContext } from '$lib/shortcut/contextsContext';
import { setContext } from 'svelte';

export type AudioContextContext = {
	audioContext?: AudioContext;
};

export const audioContextContextKey = Symbol('audioContextContextKey');

export function setAudioContextContext(audioContextContext: AudioContextContext) {
	setContext(audioContextContextKey, audioContextContext);
	updateContext(audioContextContextKey);
}
