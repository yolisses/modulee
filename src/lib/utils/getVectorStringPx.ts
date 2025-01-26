import type { Vector } from 'nodes-editor';

export function getVectorStringPx(vector: Vector) {
	return vector.x + 'px ' + vector.y + 'px';
}
