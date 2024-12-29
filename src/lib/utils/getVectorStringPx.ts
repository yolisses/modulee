import type { Vector } from '$lib/space/Vector';

export function getVectorStringPx(vector: Vector) {
	return vector.x + 'px ' + vector.y + 'px';
}
