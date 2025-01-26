import type { Vector } from 'nodes-editor';
import { getVectorStringPx } from './getVectorStringPx';

export function getVectorsStringPx(vectors: Vector[]) {
	return vectors.map((vector) => getVectorStringPx(vector)).join(' ');
}
