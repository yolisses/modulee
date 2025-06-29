import { getNodeOutputId } from '$lib/connection/getNodeOutputId';
import type { Connector } from '../connector/Connector';
import type { Node } from './Node.svelte';

// TODO consider removing it, since every node have only one output.
export class Output implements Connector {
	id: string;

	constructor(public node: Node) {
		this.id = getNodeOutputId(node.id);
	}
}
