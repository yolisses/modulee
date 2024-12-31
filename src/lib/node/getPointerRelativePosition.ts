import { getElementPosition } from './getElementPosition';
import { getPointerPosition } from './getPointerPosition';

export function getPointerScreenPosition(e: PointerEvent, element: Element) {
	const pointerPosition = getPointerPosition(e);
	const boundingRectangle = getElementPosition(element);
	return pointerPosition.subtract(boundingRectangle);
}
