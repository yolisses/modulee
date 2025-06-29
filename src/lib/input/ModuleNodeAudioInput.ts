import type { InputDefinition } from '$lib/node/definitions/InputDefinition';
import type { ModuleNode } from '../node/ModuleNode.svelte';
import { Input } from './input/Input.sveltesvelte';

export class ModuleNodeAudioInput extends Input {
	constructor(public moduleNode: ModuleNode) {
		super('audio', 'audio', moduleNode);
	}

	public getUnconnectedValue() {
		return 0;
	}

	public getInputDefinition(): InputDefinition {
		return {
			max: 1,
			min: -1,
			default: 0,
			key: 'audio',
			isBoolean: false,
		};
	}
}
