import { Node } from './Node.svelte';
import type { AudioInputNodeData } from './variants/AudioInputNodeData';

export class AudioInputNode extends Node<AudioInputNodeData> {
	get name() {
		return 'audio';
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
