import type { Connector } from 'nodes-editor';
import type { Node } from './Node.svelte';
import type { Output } from './Output.svelte';

export class Input implements Connector {
	constructor(
		public name: string,
		public node: Node,
		public connectedOutput?: Output,
	) {}

	get id() {
		return this.node.id + '/' + this.name;
	}
}
