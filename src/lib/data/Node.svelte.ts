import { nodeTypesByName } from '$lib/node/add/nodeTypesById';
import { Vector } from 'nodes-editor';
import { Input } from './Input.svelte';
import type { NodeDataBase } from './NodeDataBase';
import { Output } from './Output.svelte';

export class Node<T extends NodeDataBase = NodeDataBase> {
	output: Output;
	inputs: Input[];
	// TODO check if it makes sense to use state for position
	position: Vector = $state()!;
	protected nodeData: T;

	constructor(nodeData: T) {
		this.nodeData = structuredClone(nodeData);
		Object.freeze(this.nodeData);

		this.output = new Output(this);
		this.inputs = this.getInputs();
		this.position = Vector.fromData(this.nodeData.position);
	}

	getInputs() {
		const nodeType = nodeTypesByName[this.type];
		return nodeType.inputNames.map((inputName) => {
			return new Input(inputName, inputName, this);
		});
	}

	get id() {
		return this.nodeData.id;
	}

	get type(): T['type'] {
		return this.nodeData.type;
	}

	get extras(): T['extras'] {
		return this.nodeData.extras;
	}

	get internalModuleId() {
		return this.nodeData.internalModuleId;
	}
}
