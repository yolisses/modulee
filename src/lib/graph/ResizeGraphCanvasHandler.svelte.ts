import { getRequiredContext } from '$lib/global/getRequiredContext';
import { getRectsBoundingRect, Vector, type Rect } from 'nodes-editor';
import { graphCanvasPositioningStep } from './graphCanvasPositioningStep';
import { graphContextKey } from './graphContext';

export class ResizeGraphCanvasHandler {
	graphContext = getRequiredContext(graphContextKey);
	containerSize = $state(Vector.zero());
	minSize = $state(new Vector(graphCanvasPositioningStep, graphCanvasPositioningStep));

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
			.divideByNumber(graphCanvasPositioningStep)
			.ceil()
			.multiplyByNumber(graphCanvasPositioningStep)
			.addByNumber(graphCanvasPositioningStep)
			.add(this.containerSize);

		if (currentMinSize.x > this.minSize.x || currentMinSize.y > this.minSize.y) {
			this.minSize = this.minSize.max(currentMinSize);
		}
	};
}
