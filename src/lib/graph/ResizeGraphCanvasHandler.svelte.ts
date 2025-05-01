import { getNodeRectsContext, getRectsBoundingRect, Vector, type Rect } from 'nodes-editor';

export class ResizeGraphCanvasHandler {
	step = 100;
	containerSize = $state(Vector.zero());
	nodeRectsContext = getNodeRectsContext();
	minSize = $state(new Vector(this.step, this.step));

	initialize = (container: HTMLElement) => {
		const resizeObserver = new ResizeObserver((entries) => {
			const entry = entries[0];
			this.containerSize = new Vector(entry.contentRect.width, entry.contentRect.height);
		});
		resizeObserver.observe(container);

		return () => {
			resizeObserver.disconnect();
		};
	};

	handleRectsChange = (nodeRectsRecord: Record<string, Rect>) => {
		const nodeRects = Object.values(nodeRectsRecord);

		let boundingRectSize;
		if (nodeRects.length === 0) {
			boundingRectSize = Vector.zero();
		} else {
			const boundingRect = getRectsBoundingRect(nodeRects);
			boundingRectSize = boundingRect.position.add(boundingRect.size);
		}

		const currentMinSize = boundingRectSize
			.divideByNumber(this.step)
			.ceil()
			.multiplyByNumber(this.step)
			.addByNumber(this.step)
			.add(this.containerSize);

		if (currentMinSize.x > this.minSize.x || currentMinSize.y > this.minSize.y) {
			this.minSize = this.minSize.max(currentMinSize);
		}
	};
}
