import { expect, test } from 'vitest';
import { Vector } from './Vector';
import type { VectorData } from './VectorData';

test('Vector.getData', () => {
	const vector = new Vector(1, 2);

	const vectorData = vector.getData();

	expect(vectorData).not.toBeInstanceOf(Vector);
	expect(vectorData).toEqual({ x: 1, y: 2 });
});

test('Vector.fromData', () => {
	const vectorData: VectorData = { x: 1, y: 2 };

	const vector = Vector.fromData(vectorData);

	expect(vector).toBeInstanceOf(Vector);
	expect(vector).toEqual({ x: 1, y: 2 });
});
