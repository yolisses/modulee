import { Vector } from 'nodes-editor';
import { Input } from './Input.svelte';
import type { NodeDataBase } from './NodeDataBase';
import { Output } from './Output.svelte';
import { nodeTypesByName } from '$lib/node/definitions/nodeTypesById';

export class Node<T extends NodeDataBase = NodeDataBase> {
	output: Output;
	inputs: Input[];
	protected nodeData: T;
	position: Vector = $state()!;

	constructor(nodeData: T) {
		this.nodeData = structuredClone(nodeData);
		Object.freeze(this.nodeData);

		this.output = new Output(this);
		this.inputs = this.getInputs();
		this.position = Vector.fromData(this.nodeData.position);
	}

	private getInputs() {
		const nodeType = nodeTypesByName[this.type];
		return nodeType.inputs.map((input) => {
			return new Input(input.key, input.key, this);
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
