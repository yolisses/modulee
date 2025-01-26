import { Vector, getVectorString } from 'nodes-editor';

export function getVectorsString(vectors: Vector[]) {
	return vectors.map((vector) => getVectorString(vector)).join(' ');
}
