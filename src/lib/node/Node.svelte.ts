import { Vector } from '$lib/space/Vector';
import { Input } from './input/Input.svelte';
import type { NodeData } from './NodeData';

export class Node {
	id: string;
	size: Vector;
	position: Vector = $state()!;
	inputs: Input[] = [];

	constructor(nodeData: NodeData) {
		const { inputs, id, position, size } = nodeData;
		this.id = id;
		this.size = Vector.fromData(size);
		this.position = Vector.fromData(position);
		this.inputs = inputs.map((inputData, index) => {
			return new Input(inputData, this, index);
		});
	}

	getData(): NodeData {
		return {
			id: this.id,
			size: this.size,
			position: this.position,
			inputs: this.inputs.map((input) => input.getData()),
		};
	}
}
