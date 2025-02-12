import { getInputPathId } from '$lib/connection/getInputPathId';
import type { Connector } from './Connector';
import type { Node } from './Node.svelte';

export class Input implements Connector {
	id: string;

	constructor(
		public name: string,
		public node: Node,
	) {
		this.id = getInputPathId({
			nodeId: node.id,
			inputName: name,
		});
	}
}
