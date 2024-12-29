import type { Vector } from '$lib/space/Vector';

export function getVectorString(vector: Vector) {
	return vector.x + ' ' + vector.y;
}
