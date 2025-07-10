import type { InputDefinition } from '$lib/node/definitions/InputDefinition';
import type { InputNode } from '$lib/node/InputNode';
import type { ModuleNode } from '$lib/node/ModuleNode.svelte';
import { InputWithControl } from './InputWithControl';

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
		return {
			min,
			max,
			isBoolean: false,
			default: defaultValue,
			key: this.inputNode.id,
			canBeAutoConnected: false,
			autoConnectedByDefault: false,
		};
	}
}
