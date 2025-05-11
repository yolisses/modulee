import { getInputPathId } from '$lib/connection/getInputPathId';
import type { InputDefinition } from '$lib/node/definitions/InputDefinition';
import { nodeDefinitions } from '$lib/node/definitions/nodeDefinitions';
import type { Connector } from './Connector';
import type { InputPath } from './InputPath';
import type { Node } from './Node.svelte';

// TODO renome name and key duplication
export class Input implements Connector {
	id: string;
	targetNode?: Node;
	inputPath: InputPath;
	unconnectedValue: number;
	inputDefinition: InputDefinition;

	constructor(
		public key: string,
		public name: string,
		public node: Node,
	) {
		this.inputPath = { inputKey: key, nodeId: node.id };
		this.id = getInputPathId(this.inputPath);
		this.inputDefinition = this.getInputDefinition();
		this.unconnectedValue = this.getUnconnectedValue();
	}

	private getUnconnectedValue() {
		return this.node.unconnectedInputValues?.[this.inputPath.inputKey];
	}

	private getInputDefinition() {
		const nodeDefinition = nodeDefinitions.find((nodeDefinition) => {
			return this.node.type === nodeDefinition.name;
		});
		if (!nodeDefinition) {
			throw new Error('Node definition not found');
		}

		const inputDefinition = nodeDefinition.inputs.find((inputDefinition) => {
			return inputDefinition.key === this.key;
		});
		if (!inputDefinition) {
			throw new Error('Input definition not found');
		}

		return inputDefinition;
	}
}
