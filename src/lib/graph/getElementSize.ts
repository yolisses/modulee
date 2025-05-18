import { Vector } from 'nodes-editor';

export function getElementSize(element: HTMLElement) {
	const elementRect = element.getBoundingClientRect();
	return new Vector(elementRect.width, elementRect.height);
}
