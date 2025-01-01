import { Vector } from '$lib/space/Vector';
import type { Node } from '../Node.svelte';
import type { InputData } from './InputData';

export class Input {
	id: string;
	name: string;
	connectedTo?: Input;

	constructor(
		inputData: InputData,
		private node: Node,
		private index: number,
	) {
		const { id, name } = inputData;
		this.id = id;
		this.name = name;
	}

	assignConnectedTo(connectedTo: Input) {
		this.connectedTo = connectedTo;
	}

	get position() {
		const headerOffset = new Vector(0, 1);
		const indexOffset = new Vector(0, this.index);
		const centeringOffset = Vector.fromNumber(0.5);
		return this.node.position.add(headerOffset).add(indexOffset).add(centeringOffset);
	}

	getData(): InputData {
		return {
			id: this.id,
			name: this.name,
		};
	}
}
