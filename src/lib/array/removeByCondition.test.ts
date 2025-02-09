import { expect, test } from 'vitest';
import { removeByCondition } from './removeByCondition';

test('removeByCondition', () => {
	const items = [{ value: '1' }, { value: '2' }, { value: '3' }];

	const remotions = removeByCondition(items, (item) => {
		return item.value !== '1';
	});

	expect(remotions).toEqual([
		{ index: 1, item: { value: '2' } },
		{ index: 2, item: { value: '3' } },
	]);
	expect(items).toEqual([{ value: '1' }]);
});
