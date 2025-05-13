import type { Node } from '$lib/data/Node.svelte';
import { getElementSize } from '$lib/dev/getElementSize';
import { getZoomContext } from '$lib/space/zoom/zoomContext';
import { Vector } from 'nodes-editor';
import { getNodesMaxPosition } from './getNodesMaxPosition';
import { getNodesMinPosition } from './getNodesMinPosition';

export class GraphSizer {
	minPosition = $state<Vector>();
	maxPosition = $state<Vector>();
	zoomContext = getZoomContext();
	scrollArea = $state<HTMLElement>();

	getPadding() {
		if (!this.scrollArea) return Vector.zero();

		return getElementSize(this.scrollArea)
			.divideByNumber(2)
			.divideByNumber(this.zoomContext.zoom)
			.addByNumber(1);
	}

	handleNodesUpdate(nodes: Node[]) {
		if (nodes.length === 0) {
			this.minPosition = undefined;
			this.maxPosition = undefined;
			return;
		} else {
			const minNodePosition = getNodesMinPosition(nodes);
			const maxNodePosition = getNodesMaxPosition(nodes);

			const step = 10;
			const padding = this.getPadding();
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
			return this.getPadding().multiplyByNumber(2);
		}
	}
}
