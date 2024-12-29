import type { Space } from '$lib/space/Space';
import { Vector } from '$lib/space/Vector';

export function getScreenLineHeight(space: Space) {
	return space.getScreenSize(Vector.one()).y;
}
