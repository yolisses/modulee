import { getNodesMaxPosition } from '$lib/graph/getNodesMaxPosition';
import { getNodesMinPosition } from '$lib/graph/getNodesMinPosition';
import { Vector } from 'nodes-editor';
import { Node } from './DevNode.svelte';

export class GraphCanvasSizeHandler {
	step = 100;
	padding = 200;
	size = $state(Vector.zero());
	maxPosition = $state<Vector>();
	minPosition = $state<Vector>();
	previousMinPosition = $state<Vector>();
	previousMaxPosition = $state<Vector>();

	constructor(public element: HTMLElement) {}

	handleNodesChange(nodes: Node[]) {
		let newMinNodePosition = getNodesMinPosition(nodes)
			.divideByNumber(this.step)
			.floor()
			.multiplyByNumber(this.step)
			.subtractByNumber(this.padding);

		let newMaxNodePosition = getNodesMaxPosition(nodes)
			.divideByNumber(this.step)
			.ceil()
			.multiplyByNumber(this.step)
			.addByNumber(this.padding);

		if (!this.previousMinPosition || this.previousMinPosition.notEquals(newMinNodePosition)) {
			this.previousMinPosition = newMinNodePosition;

			if (this.minPosition) {
				newMinNodePosition = newMinNodePosition.min(this.minPosition);
				const difference = newMinNodePosition.subtract(this.minPosition);
				this.element.scrollBy({
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
}
