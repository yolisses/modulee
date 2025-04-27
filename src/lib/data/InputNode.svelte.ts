import { Node } from './Node.svelte';
import type { InputNodeData } from './variants/InputNodeData';

export class InputNode extends Node<InputNodeData> {
	get name() {
		return this.nodeData.extras.name;
	}
}
