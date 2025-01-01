import { Vector } from '$lib/space/Vector';
import type { Input } from '../input/Input.svelte';
import type { Node } from '../Node.svelte';
import type { OutputData } from './OutputData';

export class Output {
	id: string;
	name: string;
	connectedInputs: Input[] = [];

	constructor(
		outputData: OutputData,
		private node: Node,
		private index: number,
	) {
		const { id, name } = outputData;
		this.id = id;
		this.name = name;
	}

	get position() {
		const headerOffset = new Vector(0, 1);
		const indexOffset = new Vector(0, this.index);
		const centeringOffset = Vector.fromNumber(0.5);
		return this.node.position.add(headerOffset).add(indexOffset).add(centeringOffset);
	}

	getData(): OutputData {
		return {
			id: this.id,
			name: this.name,
		};
	}
}
