import { Node } from './Node.svelte';
import type { InputNodeData } from './variants/InputNodeData';

export class InputNode extends Node<InputNodeData> {
	get name() {
		return this.nodeData.extras.name;
	}
	get min() {
		return this.nodeData.extras.min;
	}
	get max() {
		return this.nodeData.extras.max;
	}
	get defaultValue() {
		return this.nodeData.extras.default;
	}
}
