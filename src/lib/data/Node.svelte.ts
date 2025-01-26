import type { Vector } from 'nodes-editor';
import type { Input } from './Input.svelte';
import type { NodeData } from './NodeData';
import type { Output } from './Output.svelte';

// TODO check if it makes sense to keep data as a
// froze object instead of copying its values
export class Node {
	id: string;
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
		this.inputs = inputs.map((inputData) => new Input(inputData, this));
		this.outputs = outputs.map((outerData) => new Output(outerData, this));
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
