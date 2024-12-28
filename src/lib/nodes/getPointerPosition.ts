import { Vector } from '$lib/space/Vector';

export function getPointerPosition(e: PointerEvent | MouseEvent) {
	return new Vector(e.clientX, e.clientY);
}
