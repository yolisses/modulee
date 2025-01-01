import { Vector } from '$lib/space/Vector';
import type { Node } from '../Node.svelte';
import type { Output } from '../output/Output.svelte';
import type { InputData } from './InputData';

export class Input {
	id: string;
	name: string;
	connectedOutput?: Output;
	connectedOutputId?: string;

	constructor(
		inputData: InputData,
		private node: Node,
		private offset: number,
	) {
		const { id, name, connectedOutputId } = inputData;
		this.id = id;
		this.name = name;
		this.connectedOutputId = connectedOutputId;
	}

	get connectorPosition() {
		const indexOffset = new Vector(0, this.offset);
		const centeringOffset = new Vector(0.5, 0.5);
		return this.node.position.add(indexOffset).add(centeringOffset);
	}

	getData(): InputData {
		return {
			id: this.id,
			name: this.name,
		};
	}
}
