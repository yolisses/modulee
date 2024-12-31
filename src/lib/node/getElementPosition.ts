import { Vector } from '$lib/space/Vector';

export function getElementPosition(element: Element): Vector {
	const boundingRectangle = element.getBoundingClientRect();
	return new Vector(boundingRectangle.x, boundingRectangle.y);
}
