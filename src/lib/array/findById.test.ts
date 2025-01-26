import { expect, test } from 'vitest';
import { findById } from './findById.js';
import type { HasId } from './HasId.js';

test('findById', () => {
	const items: HasId[] = [{ id: '1' }, { id: '2' }, { id: '3' }];

	expect(findById(items, '2')).toEqual({ id: '2' });
});

test('findById with item missing', () => {
	const items: HasId[] = [{ id: '1' }, { id: '2' }, { id: '3' }];

	expect(() => findById(items, '4')).toThrow();
});
