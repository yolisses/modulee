import { expect, test } from 'vitest';
import { findOrNullById } from './findOrNullById';
import type { HasId } from './HasId';

test('findOrNullById', () => {
	const items: HasId[] = [{ id: '1' }, { id: '2' }, { id: '3' }];

	expect(findOrNullById(items, '2')).toEqual({ id: '2' });
});

test('findOrNullById with item missing', () => {
	const items: HasId[] = [{ id: '1' }, { id: '2' }, { id: '3' }];

	expect(findOrNullById(items, '4')).toBeNull();
});
