import { getElementPosition } from '$lib/node/getElementPosition';
import { getPointerPosition } from '$lib/node/getPointerPosition';
import type { Space } from '$lib/space/Space';

export function getDataPointerPosition(e: PointerEvent, space: Space, container: Element) {
	const containerPosition = getElementPosition(container);
	const screenPosition = getPointerPosition(e).subtract(containerPosition);
	const dataPosition = space.getDataPosition(screenPosition);
	return dataPosition;
}
