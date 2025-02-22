import type { ById } from '$lib/editor/ById';
import { nodeTypesByName } from '$lib/node/add/nodeTypesById';
import { Vector } from 'nodes-editor';
import type { ConnectionData } from './ConnectionData';
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
	extras: T['extras'];
	// DEBUG consider removing $state from groupId
	groupId: string = $state()!;
	position: Vector = $state()!;

	constructor(nodeData: NodeData, connectionsData: ById<ConnectionData>) {
		const { id, type, extras, position, groupId } = nodeData;
		this.id = id;
		this.type = type;
		this.extras = extras;
		this.groupId = groupId;
		this.output = new Output(this);
		this.position = Vector.fromData(position);
		this.inputs = this.calculateInputs(connectionsData);
	}

	getData(): NodeData {
		return {
			id: this.id,
			type: this.type,
			extras: this.extras,
			groupId: this.groupId,
			position: this.position.getData(),
		} as NodeData;
	}

	calculateInputs(connectionsData: ById<ConnectionData>) {
		const inputs: Input[] = [];

		connectionsData.values().forEach((connectionData) => {
			if (connectionData.inputPath.nodeId !== this.id) return;
			// The connected output is set in Editor
			const input = new Input(connectionData.inputPath.inputName, this);
			inputs.push(input);
		});

		const nodeType = nodeTypesByName[this.type];
		nodeType.inputNames.forEach((inputName) => {
			const alreadyExists = inputs.some((input) => {
				return input.name === inputName;
			});
			if (alreadyExists) return;
			const input = new Input(inputName, this);
			inputs.push(input);
		});

		inputs.sort((input1, input2) => {
			return input1.name.localeCompare(input2.name);
		});

		return inputs;
	}
}
