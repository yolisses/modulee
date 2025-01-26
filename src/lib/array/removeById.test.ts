import { expect, test } from 'vitest';
import type { HasId } from './HasId.js';
import { removeById } from './removeById.js';

test('removeById', () => {
	const items: HasId[] = [{ id: '1' }, { id: '2' }, { id: '3' }];

	const remotion = removeById(items, '2');

	expect(remotion).toEqual({ index: 1, item: { id: '2' } });
	expect(items).toEqual([{ id: '1' }, { id: '3' }]);
});

test('removeById with missing item', () => {
	const items: HasId[] = [{ id: '1' }, { id: '3' }];

	expect(() => removeById(items, '2')).toThrowError();
});
