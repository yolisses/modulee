import { expect, test } from 'vitest';
import { removeByIndex } from './removeByIndex';

test('removeByIndex', () => {
	const items = [{ value: '1' }, { value: '2' }, { value: '3' }];

	const remotion = removeByIndex(items, 1);

	expect(remotion).toEqual({ index: 1, item: { value: '2' } });
	expect(items).toEqual([{ value: '1' }, { value: '3' }]);
});

test('removeByIndex with invalid index', () => {
	const items = [{ value: '1' }, { value: '3' }];

	expect(() => removeByIndex(items, -1)).toThrow();
	expect(() => removeByIndex(items, 5)).toThrow();
});
