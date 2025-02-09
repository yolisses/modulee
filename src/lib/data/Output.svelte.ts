import type { Connector } from 'nodes-editor';
import type { Node } from './Node.svelte';

// TODO consider removing it, since every node have only one output.
export class Output implements Connector {
	id: string;

	constructor(public node: Node) {
		this.id = node.id + '/output';
	}
}
