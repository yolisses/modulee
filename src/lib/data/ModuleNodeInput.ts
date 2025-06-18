import type { InputDefinition } from '$lib/node/definitions/InputDefinition';
import type { AudioInputNode } from './AudioInputNode.svelte';
import { Input } from './Input.svelte';
import type { InputNode } from './InputNode.svelte';
import type { ModuleNode } from './ModuleNode.svelte';

export class ModuleNodeInput extends Input {
	constructor(
		public moduleNode: ModuleNode,
		public inputNode: InputNode | AudioInputNode,
	) {
		super(inputNode.id, inputNode.name, moduleNode);
	}

	public getUnconnectedValue() {
		return super.getUnconnectedValue() || this.inputNode.defaultValue;
	}

	public getInputDefinition(): InputDefinition {
		const { min, max, defaultValue } = this.inputNode;
		return { min, max, default: defaultValue, isBoolean: false, key: this.inputNode.id };
	}
}
