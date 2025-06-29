import type { InputNodeData } from './data/variants/InputNodeData';
import { Node } from './Node.svelte';

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
