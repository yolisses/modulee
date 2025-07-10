import type { InputDefinition } from '$lib/node/definitions/InputDefinition';
import type { ModuleNode } from '../node/ModuleNode.svelte';
import { AUDIO_INPUT_KEY } from './AUDIO_INPUT_KEY';
import { Input } from './Input';

export class ModuleNodeAudioInput extends Input {
	constructor(public moduleNode: ModuleNode) {
		super(AUDIO_INPUT_KEY, 'audio', moduleNode);
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
			canBeAutoConnected: false,
			autoConnectedByDefault: false,
		};
	}
}
