import { AUDIO_INPUT_KEY } from '$lib/input/AUDIO_INPUT_KEY';
import type { AudioInputNodeData } from './data/variants/AudioInputNodeData';
import { Node } from './Node.svelte';

export class AudioInputNode extends Node<AudioInputNodeData> {
	get name() {
		return AUDIO_INPUT_KEY;
	}
	get min() {
		return -1;
	}
	get max() {
		return 1;
	}
	get defaultValue() {
		return 0;
	}
}
