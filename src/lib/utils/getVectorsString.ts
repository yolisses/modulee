import type { Vector } from '$lib/space/Vector';
import { getVectorString } from './getVectorString';

export function getVectorsString(vectors: Vector[]) {
	return vectors.map((vector) => getVectorString(vector)).join(' ');
}
