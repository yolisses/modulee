import { Vector } from 'nodes-editor';
import type { Input } from './Input.svelte';
import type { NodeData } from './NodeData';
import type { Output } from './Output.svelte';

// TODO check if it makes sense to keep data as a
// froze object instead of copying its values
export class Node {
	id: string;
	size: Vector;
	type: string;
	inputs: Input[] = [];
	outputs: Output[] = [];
	position: Vector = $state()!;
	extras: Record<string, number>;

	constructor(nodeData: NodeData) {
		const { inputs, id, type, extras, outputs, position } = nodeData;
		this.id = id;
		this.type = type;
		this.extras = extras;
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
			type: this.type,
			extras: this.extras,
			position: this.position,
			inputs: this.inputs.map((input) => input.getData()),
			outputs: this.outputs.map((output) => output.getData()),
		};
	}
}
