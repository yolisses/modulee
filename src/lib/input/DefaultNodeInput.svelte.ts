import type { InputDefinition } from '$lib/node/definitions/InputDefinition';
import { nodeDefinitions } from '$lib/node/definitions/nodeDefinitions';
import { InputWithControl } from './InputWithControl';

export class DefaultNodeInput extends InputWithControl {
	getUnconnectedValue() {
		return this.node.unconnectedInputValues?.[this.inputPath.inputKey];
	}

	getInputDefinition(): InputDefinition {
		const nodeDefinition = nodeDefinitions.find((nodeDefinition) => {
			return this.node.type === nodeDefinition.type;
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
