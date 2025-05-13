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

		let minNodePosition = getNodesMinPosition(nodes);
		let maxNodePosition = getNodesMaxPosition(nodes);

		const padding = Vector.fromNumber(10);

		minNodePosition = minNodePosition.subtract(padding);
		maxNodePosition = maxNodePosition.add(padding);

		this.offset = minNodePosition.negate();
		this.size = maxNodePosition.subtract(minNodePosition);
	}
}
