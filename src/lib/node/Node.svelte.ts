import { Vector } from '$lib/space/Vector';
import { Input } from './input/Input.svelte';
import type { NodeData } from './NodeData';
import { Output } from './output/Output.svelte';

export class Node {
	id: string;
	size: Vector;
	position: Vector = $state()!;
	inputs: Input[] = [];
	outputs: Output[] = [];

	constructor(nodeData: NodeData) {
		const { inputs, id, outputs, position, size } = nodeData;
		this.id = id;
		this.size = Vector.fromData(size);
		this.position = Vector.fromData(position);
		this.inputs = inputs.map((inputData, index) => {
			return new Input(inputData, this, index);
		});
		this.outputs = outputs.map((outerData, index) => {
			return new Output(outerData, this, index);
		});
	}

	getData(): NodeData {
		return {
			id: this.id,
			size: this.size,
			position: this.position,
			inputs: this.inputs.map((input) => input.getData()),
			outputs: this.outputs.map((output) => output.getData()),
		};
	}
}
