import type { InputDefinition } from '$lib/node/definitions/InputDefinition';
import { Input } from './Input.svelte';
import type { InputNode } from './InputNode.svelte';
import type { ModuleNode } from './ModuleNode.svelte';

export class ModuleNodeInput extends Input {
	constructor(
		public moduleNode: ModuleNode,
		public inputNode: InputNode,
	) {
		super(inputNode.id, inputNode.name, moduleNode);
	}

	public getUnconnectedValue() {
		return super.getUnconnectedValue() || this.inputNode.extras.default;
	}

	public getInputDefinition(): InputDefinition {
		const { min, max, default: defaultValue } = this.inputNode.extras;
		return { min, max, defaultValue, isBoolean: false, key: this.inputNode.id };
	}
}
