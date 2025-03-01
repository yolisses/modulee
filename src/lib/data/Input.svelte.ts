import { getInputPathId } from '$lib/connection/getInputPathId';
import type { Connector } from './Connector';
import type { InputPath } from './InputPath';
import type { Node } from './Node.svelte';

export class Input implements Connector {
	id: string;
	inputPath: InputPath;

	constructor(
		public key: string,
		public name: string,
		public node: Node,
	) {
		this.inputPath = { inputKey: key, nodeId: node.id };
		this.id = getInputPathId(this.inputPath);
	}
}
