import { Vector } from 'nodes-editor';
import type { ConnectionData } from './ConnectionData';
import type { ExtrasData } from './ExtrasData';
import { Input } from './Input.svelte';
import type { NodeData } from './NodeData';
import { Output } from './Output.svelte';

// TODO check if it makes sense to keep data as a froze object instead of
// copying its values
export class Node {
	id: string;
	type: string;
	output: Output;
	inputs!: Input[];
	extras: ExtrasData;
	// DEBUG remove $state from here
	groupId: string = $state()!;
	position: Vector = $state()!;

	constructor(nodeData: NodeData) {
		const { id, type, extras, position, groupId } = nodeData;
		this.id = id;
		this.type = type;
		this.extras = extras;
		this.groupId = groupId;
		this.output = new Output(this);
		this.position = Vector.fromData(position);
	}

	updateInputs(connectionsData: ConnectionData[]) {
		connectionsData.forEach((connectionData) => {
			if (connectionData.nodeId !== this.id) return;
			// The connected output is set in Editor
			const input = new Input(connectionData.inputName, this);
			this.inputs.push(input);
		});
		this.inputs.sort((input1, input2) => {
			return input1.name.localeCompare(input2.name);
		});
	}
}
