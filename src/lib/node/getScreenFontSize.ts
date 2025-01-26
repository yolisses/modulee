import type { Space } from '$lib/space/Space.js';
import { Vector } from 'nodes-editor';

export function getScreenFontSize(space: Space) {
	return space.getScreenSize(Vector.fromNumber(3 / 4)).y;
}
