import type { Node } from '$lib/data/Node.svelte';
import { getZoomContext } from '$lib/space/zoom/zoomContext';
import { Vector } from 'nodes-editor';
import { getNodesMaxPosition } from './getNodesMaxPosition';
import { getNodesMinPosition } from './getNodesMinPosition';

export class GraphSizer {
	scrollArea?: HTMLElement;
	minPosition = $state<Vector>();
	maxPosition = $state<Vector>();
	zoomContext = getZoomContext();

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
			const step = 10;
			let newMinPosition = minNodePosition
				.divideByNumber(step)
				.floor()
				.multiplyByNumber(step)
				.subtract(padding);
			let newMaxPosition = maxNodePosition
				.divideByNumber(step)
				.ceil()
				.multiplyByNumber(step)
				.add(padding);

			if (this.minPosition) {
				newMinPosition = this.minPosition.min(newMinPosition);
			}
			if (this.maxPosition) {
				newMaxPosition = this.maxPosition.max(newMaxPosition);
			}

			if (!this.minPosition || this.minPosition.notEquals(newMinPosition)) {
				if (this.minPosition && this.scrollArea) {
					const difference = newMinPosition
						.subtract(this.minPosition)
						.multiplyByNumber(this.zoomContext.zoom)
						.negate();
					this.scrollArea.scrollBy({
						top: difference.y,
						left: difference.x,
						behavior: 'instant',
					});
				}
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
