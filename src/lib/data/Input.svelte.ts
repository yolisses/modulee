import type { Connector } from 'nodes-editor';
import type { InputData } from './InputData';
import type { Node } from './Node.svelte';
import type { Output } from './Output.svelte';

export class Input implements Connector {
	name: string;
	connectedOutput?: Output;
	connectedOutputId?: string;

	constructor(
		inputData: InputData,
		public node: Node,
	) {
		const { name, connectedOutputId } = inputData;
		this.name = name;
		this.connectedOutputId = connectedOutputId;
	}

	get id() {
		return this.node.id + '/' + this.name;
	}
}
