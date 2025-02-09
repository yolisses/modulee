import { Vector } from 'nodes-editor';
import type { ExtrasData } from './ExtrasData';
import { Input } from './Input.svelte';
import type { NodeData } from './NodeData';
import { Output } from './Output.svelte';

// TODO check if it makes sense to keep data as a froze object instead of
// copying its values
export class Node {
	id: string;
	type: string;
	inputs: Input[];
	outputs: Output[];
	extras: ExtrasData;
	// DEBUG remove $state from here
	groupId: string = $state()!;
	position: Vector = $state()!;

	constructor(nodeData: NodeData) {
		const { inputs, id, type, extras, outputs, position, groupId } = nodeData;
		this.id = id;
		this.type = type;
		this.extras = extras;
		this.groupId = groupId;
		this.position = Vector.fromData(position);
		this.inputs = inputs.map((inputData) => new Input(inputData, this));
		this.outputs = outputs.map((outerData) => new Output(outerData, this));
	}

	// TODO consider removing this
	getData(): NodeData {
		return {
			id: this.id,
			type: this.type,
			extras: this.extras,
			groupId: this.groupId,
			position: this.position,
			inputs: this.inputs.map((input) => input.getData()),
			outputs: this.outputs.map((output) => output.getData()),
		};
	}
}
