import type { Space } from '$lib/space/Space';
import { Vector } from 'nodes-editor';

export function getScreenFontSize(space: Space) {
	return space.getScreenSize(Vector.fromNumber(0.75)).y;
}
