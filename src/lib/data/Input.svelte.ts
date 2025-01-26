import type { Connector } from './Connector.js';
import type { InputData } from './InputData.js';
import type { Node } from './Node.svelte.js';
import type { Output } from './Output.svelte.js';

export class Input implements Connector {
	id: string;
	name: string;
	connectedOutput?: Output;
	connectedOutputId?: string;

	constructor(
		inputData: InputData,
		public node: Node
	) {
		const { id, name, connectedOutputId } = inputData;
		this.id = id;
		this.name = name;
		this.connectedOutputId = connectedOutputId;
	}

	getData(): InputData {
		return {
			id: this.id,
			name: this.name
		};
	}
}
