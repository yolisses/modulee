import type { Vector } from '$lib/space/Vector';
import { getVectorStringPx } from './getVectorStringPx';

export function getVectorsStringPx(vectors: Vector[]) {
	return vectors.map((vector) => getVectorStringPx(vector)).join(' ');
}
