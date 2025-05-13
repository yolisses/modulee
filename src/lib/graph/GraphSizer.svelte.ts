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

		const padding = Vector.fromNumber(10);

		const minPosition = minNodePosition.subtract(padding);
		const maxPosition = maxNodePosition.add(padding);

		this.offset = minPosition.negate();
		this.size = maxPosition.subtract(minPosition);
	}
}
