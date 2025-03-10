import { nodeTypesByName } from '$lib/node/add/nodeTypesById';
import { Vector } from 'nodes-editor';
import { Input } from './Input.svelte';
import type { NodeData } from './NodeData';
import { Output } from './Output.svelte';

// TODO check if it makes sense to keep data as a froze object instead of
// copying its values
export class Node<T extends NodeData = NodeData> {
	id: string;
	output: Output;
	inputs: Input[];
	type: T['type'];
	internalModuleId: string;
	extras: T['extras'];
	position: Vector = $state()!;

	constructor(nodeData: NodeData) {
		const { id, type, extras, position, internalModuleId } = nodeData;
		this.id = id;
		this.type = type;
		this.extras = extras;
		this.internalModuleId = internalModuleId;
		this.output = new Output(this);
		this.inputs = this.getInputs();
		this.position = Vector.fromData(position);
	}

	getInputs() {
		const inputs: Input[] = [];

		const nodeType = nodeTypesByName[this.type];
		nodeType.inputNames.forEach((inputName) => {
			const input = new Input(inputName, inputName, this);
			inputs.push(input);
		});

		return inputs;
	}
}
