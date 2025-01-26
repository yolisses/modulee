import type { Connector } from 'nodes-editor';
import type { Input } from './Input.svelte';
import type { OutputData } from './OutputData';

export class Output implements Connector {
	id: string;
	name: string;
	connectedInputs: Input[] = [];

	constructor(
		outputData: OutputData,
		public node: Node,
	) {
		const { id, name } = outputData;
		this.id = id;
		this.name = name;
	}

	getData(): OutputData {
		return {
			id: this.id,
			name: this.name,
		};
	}
}
