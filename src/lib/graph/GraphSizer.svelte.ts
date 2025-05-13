import type { Node } from '$lib/data/Node.svelte';
import { Vector } from 'nodes-editor';
import { getNodesMaxPosition } from './getNodesMaxPosition';
import { getNodesMinPosition } from './getNodesMinPosition';

export class GraphSizer {
	minPosition = $state<Vector>();
	maxPosition = $state<Vector>();

	handleNodesUpdate(nodes: Node[]) {
		const minNodePosition = getNodesMinPosition(nodes);
		const maxNodePosition = getNodesMaxPosition(nodes);

		const padding = Vector.fromNumber(10);
		this.minPosition = minNodePosition.subtract(padding);
		this.maxPosition = maxNodePosition.add(padding);
	}

	getOffset() {
		if (this.minPosition) {
			return this.minPosition.negate();
		} else {
			return Vector.zero();
		}
	}

	getSize() {
		if (this.minPosition && this.maxPosition) {
			return this.maxPosition.subtract(this.minPosition);
		} else {
			// DEBUG
			return Vector.fromNumber(4);
		}
	}
}
