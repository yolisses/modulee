import { expect, test } from 'vitest';
import type { HasId } from './HasId';
import { removeByIndex } from './removeByIndex';

test('removeByIndex', () => {
	const items: HasId[] = [{ id: '1' }, { id: '2' }, { id: '3' }];

	const remotion = removeByIndex(items, 1);

	expect(remotion).toEqual({ index: 1, item: { id: '2' } });
	expect(items).toEqual([{ id: '1' }, { id: '3' }]);
});

test('removeByIndex with invalid index', () => {
	const items: HasId[] = [{ id: '1' }, { id: '3' }];

	expect(() => removeByIndex(items, -1)).toThrow();
	expect(() => removeByIndex(items, 5)).toThrow();
});
