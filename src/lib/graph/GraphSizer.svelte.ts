import type { Node } from '$lib/data/Node.svelte';
import { Vector } from 'nodes-editor';
import { getNodesMaxPosition } from './getNodesMaxPosition';
import { getNodesMinPosition } from './getNodesMinPosition';

export class GraphSizer {
	minPosition = $state<Vector>();
	maxPosition = $state<Vector>();

	handleNodesUpdate(nodes: Node[]) {
		if (nodes.length === 0) {
			this.minPosition = undefined;
			this.maxPosition = undefined;
			return;
		} else {
			const minNodePosition = getNodesMinPosition(nodes);
			const maxNodePosition = getNodesMaxPosition(nodes);

			console.log(minNodePosition, maxNodePosition);

			const padding = Vector.fromNumber(8);
			let newMinPosition = minNodePosition.subtract(padding);
			let newMaxPosition = maxNodePosition.add(padding);

			if (this.minPosition) {
				newMinPosition = this.minPosition.min(newMinPosition);
			}
			if (this.maxPosition) {
				newMaxPosition = this.maxPosition.max(newMaxPosition);
			}

			if (!this.minPosition || this.minPosition.notEquals(newMinPosition)) {
				this.minPosition = newMinPosition;
			}
			if (!this.maxPosition || this.maxPosition.notEquals(newMaxPosition)) {
				this.maxPosition = newMaxPosition;
			}
		}
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
