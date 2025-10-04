import { DefaultNodeInput } from '$lib/input/DefaultNodeInput';
import type { Input } from '$lib/input/Input';
import { Vector } from 'nodes-editor';
import type { NodeDataBase } from './data/NodeDataBase';
import { nodeDefinitionsByName } from './definitions/nodeDefinitionsByName';
import { Output } from './Output';

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
		const nodeDefinition = nodeDefinitionsByName[this.type];
		return nodeDefinition.inputs.map((input) => {
			return new DefaultNodeInput(input.key, input.key, this);
		});
	}

	get extras(): T['extras'] {
		return this.nodeData.extras;
	}
	get id() {
		return this.nodeData.id;
	}
	get internalModuleId() {
		return this.nodeData.internalModuleId;
	}
	get isInputAutoConnectedMap(): T['isInputAutoConnectedMap'] {
		return this.nodeData.isInputAutoConnectedMap;
	}
	get name() {
		return this.nodeData.name;
	}
	get type(): T['type'] {
		return this.nodeData.type;
	}
	get unconnectedInputValues(): T['unconnectedInputValues'] {
		return this.nodeData.unconnectedInputValues;
	}
}
