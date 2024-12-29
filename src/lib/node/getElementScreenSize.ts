import { Vector } from '$lib/space/Vector';

export function getElementScreenSize(element: Element) {
	return new Vector(element.clientWidth, element.clientHeight);
}
