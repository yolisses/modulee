import type { Node } from '$lib/data/Node.svelte';
import { Vector } from 'nodes-editor';
import { getNodesMaxPosition } from './getNodesMaxPosition';
import { getNodesMinPosition } from './getNodesMinPosition';

export class GraphSizer {
	size = $state(Vector.zero());
	offset = $state(Vector.zero());

	handleNodesUpdate(nodes: Node[]) {
		if (nodes.length === 0) {
			this.offset = Vector.zero();
			// this.size = Vector.zero();
			this.size = Vector.fromNumber(10);
			return;
		}

		const minNodePosition = getNodesMinPosition(nodes);
		const maxNodePosition = getNodesMaxPosition(nodes);
		this.offset = minNodePosition.negate();
		this.size = maxNodePosition.subtract(minNodePosition);
	}
}
