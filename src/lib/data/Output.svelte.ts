import type { Connector } from './Connector.js';
import type { Input } from './Input.svelte.js';
import type { Node } from './Node.svelte.js';
import type { OutputData } from './OutputData.js';

export class Output implements Connector {
	id: string;
	name: string;
	connectedInputs: Input[] = [];

	constructor(
		outputData: OutputData,
		public node: Node
	) {
		const { id, name } = outputData;
		this.id = id;
		this.name = name;
	}

	getData(): OutputData {
		return {
			id: this.id,
			name: this.name
		};
	}
}
