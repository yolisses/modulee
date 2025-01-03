import { Vector } from '$lib/space/Vector';
import { Input } from './input/Input.svelte';
import type { NodeData } from './NodeData';
import { Output } from './output/Output.svelte';

export class Node {
	id: string;
	size: Vector;
	inputs: Input[] = [];
	outputs: Output[] = [];
	position: Vector = $state()!;

	constructor(nodeData: NodeData) {
		const { inputs, id, outputs, position } = nodeData;
		this.id = id;
		this.position = Vector.fromData(position);

		let offset = 0;

		const headerOffset = 1;
		offset += headerOffset;

		this.outputs = outputs.map((outerData) => {
			const output = new Output(outerData, this, offset);
			offset++;
			return output;
		});
		this.inputs = inputs.map((inputData) => {
			const input = new Input(inputData, this, offset);
			offset++;
			return input;
		});

		const width = 6;
		this.size = new Vector(width, offset);
	}

	getData(): NodeData {
		return {
			id: this.id,
			position: this.position,
			inputs: this.inputs.map((input) => input.getData()),
			outputs: this.outputs.map((output) => output.getData()),
		};
	}
}
