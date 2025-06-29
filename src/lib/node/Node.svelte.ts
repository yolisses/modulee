import { DefaultNodeInput } from '$lib/input/DefaultNodeInput.svelte';
import type { Input } from '$lib/input/Input.svelte';
import { Vector } from 'nodes-editor';
import type { NodeDataBase } from './data/NodeDataBase';
import { nodeDefinitionsByName } from './definitions/nodeDefinitionsByName';
import { Output } from './Output.svelte';

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
		console.log(this.inputs);
		this.position = Vector.fromData(this.nodeData.position);
	}

	private getInputs() {
		const nodeDefinition = nodeDefinitionsByName[this.type];
		return nodeDefinition.inputs.map((input) => {
			return new DefaultNodeInput(input.key, input.key, this);
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

	get unconnectedInputValues(): T['unconnectedInputValues'] {
		return this.nodeData.unconnectedInputValues;
	}
}
