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
		const value = super.getUnconnectedValue();
		return value === undefined ? this.inputNode.defaultValue : value;
	}

	public getInputDefinition(): InputDefinition {
		const { min, max, defaultValue } = this.inputNode;
		return { min, max, default: defaultValue, isBoolean: false, key: this.inputNode.id };
	}
}
