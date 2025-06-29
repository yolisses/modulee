import type { InputDefinition } from '$lib/node/definitions/InputDefinition';
import type { InputNode } from './InputNode.svelte';
import { InputWithControl } from './InputWithControl';
import type { ModuleNode } from './ModuleNode.svelte';

export class ModuleNodeInput extends InputWithControl {
	constructor(
		public moduleNode: ModuleNode,
		public inputNode: InputNode,
	) {
		super(inputNode.id, inputNode.name, moduleNode);
	}

	public getUnconnectedValue() {
		const value = this.node.unconnectedInputValues?.[this.inputPath.inputKey];
		return value === undefined ? this.inputNode.defaultValue : value;
	}

	public getInputDefinition(): InputDefinition {
		const { min, max, defaultValue } = this.inputNode;
		return { min, max, default: defaultValue, isBoolean: false, key: this.inputNode.id };
	}
}
