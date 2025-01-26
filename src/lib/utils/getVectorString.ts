import type { Vector } from 'nodes-editor';

export function getVectorString(vector: Vector) {
	return vector.x + ' ' + vector.y;
}
