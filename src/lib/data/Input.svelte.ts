import { getInputPathId } from '$lib/connection/getInputPathId';
import type { Connector } from 'nodes-editor';
import type { Node } from './Node.svelte';
import type { Output } from './Output.svelte';

export class Input implements Connector {
	id: string;

	constructor(
		public name: string,
		public node: Node,
		public connectedOutput?: Output,
	) {
		this.id = getInputPathId({
			nodeId: node.id,
			inputName: name,
		});
	}
}
