import { getNodesMaxPosition } from '$lib/graph/getNodesMaxPosition';
import { getNodesMinPosition } from '$lib/graph/getNodesMinPosition';
import { Vector } from 'nodes-editor';
import { Node } from './DevNode.svelte';

export class GraphCanvasSizeHandler {
	step = 100;
	size = $state(Vector.zero());
	maxPosition = $state<Vector>();
	minPosition = $state<Vector>();
	previousMinPosition = $state<Vector>();
	previousMaxPosition = $state<Vector>();

	constructor(
		public scrollArea: HTMLElement,
		public nodes: Node[],
	) {}

	initializeObserver = () => {
		const resizeObserver = new ResizeObserver(() => {
			this.handleNodesChange();
		});
		resizeObserver.observe(this.scrollArea);
		return () => resizeObserver.disconnect();
	};

	handleNodesChange() {
		const padding = 200;

		let newMinNodePosition = getNodesMinPosition(this.nodes)
			.divideByNumber(this.step)
			.floor()
			.multiplyByNumber(this.step)
			.subtractByNumber(padding);

		let newMaxNodePosition = getNodesMaxPosition(this.nodes)
			.divideByNumber(this.step)
			.ceil()
			.multiplyByNumber(this.step)
			.addByNumber(padding);

		if (!this.previousMinPosition || this.previousMinPosition.notEquals(newMinNodePosition)) {
			this.previousMinPosition = newMinNodePosition;

			if (this.minPosition) {
				newMinNodePosition = newMinNodePosition.min(this.minPosition);
				const difference = newMinNodePosition.subtract(this.minPosition);
				this.scrollArea.scrollBy({
					top: -difference.y,
					left: -difference.x,
				});
			}

			this.minPosition = newMinNodePosition;
		}

		if (!this.previousMaxPosition || this.previousMaxPosition.notEquals(newMaxNodePosition)) {
			this.previousMaxPosition = newMaxNodePosition;

			if (this.maxPosition) {
				newMaxNodePosition = newMaxNodePosition.max(this.maxPosition);
			}

			this.maxPosition = newMaxNodePosition;
		}

		if (this.maxPosition && this.minPosition) {
			this.size = this.maxPosition.subtract(this.minPosition);
		}
	}

	get offset() {
		if (this.minPosition) {
			return this.minPosition.negate();
		} else {
			return Vector.zero();
		}
	}
}
