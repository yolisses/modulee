import type { InputDefinition } from '$lib/node/definitions/InputDefinition';
import { Input } from './Input.svelte';
import type { ModuleNode } from './ModuleNode.svelte';

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
