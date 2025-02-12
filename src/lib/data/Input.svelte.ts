import { getInputPathId } from '$lib/connection/getInputPathId';
import type { Connector } from './Connector';
import type { InputPath } from './InputPath';
import type { Node } from './Node.svelte';

export class Input implements Connector {
	id: string;
	inputPath: InputPath;

	constructor(
		public name: string,
		public node: Node,
	) {
		this.inputPath = {
			nodeId: node.id,
			inputName: name,
		};
		this.id = getInputPathId(this.inputPath);
	}
}
