import type { Connector } from 'nodes-editor';
import type { InputData } from './InputData';
import type { Node } from './Node.svelte';
import type { Output } from './Output.svelte';

export class Input implements Connector {
	id: string;
	name: string;
	connectedOutput?: Output;
	connectedOutputId?: string;

	constructor(
		inputData: InputData,
		public node: Node,
	) {
		const { id, name, connectedOutputId } = inputData;
		this.id = id;
		this.name = name;
		this.connectedOutputId = connectedOutputId;
	}

	getData(): InputData {
		return {
			id: this.id,
			name: this.name,
		};
	}
}
