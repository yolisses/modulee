import { getInputPathId } from '$lib/connection/getInputPathId';
import type { InputDefinition } from '$lib/node/definitions/InputDefinition';
import type { Connector } from './Connector';
import type { InputPath } from './InputPath';
import type { Node } from './Node.svelte';

export abstract class Input implements Connector {
	id: string;
	targetNode?: Node;
	inputPath: InputPath;

	constructor(
		public key: string,
		public name: string,
		public node: Node,
	) {
		this.inputPath = { inputKey: key, nodeId: node.id };
		this.id = getInputPathId(this.inputPath);
	}

	getControlNodeId() {
		return this.id + '.control';
	}

	abstract getInputDefinition(): InputDefinition;
}
