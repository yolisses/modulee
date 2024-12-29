import { Vector } from '$lib/space/Vector';

export function getElementScreenSize(element: HTMLElement) {
	return new Vector(element.clientWidth, element.clientHeight);
}
