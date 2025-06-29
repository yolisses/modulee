import { describe, expect, it } from 'vitest';
import { expandById } from './expandById';

type Item = { id: string; value: number };

describe('expandById', () => {
	const items: Item[] = [
		{ id: 'a', value: 1 },
		{ id: 'b', value: 2 },
		{ id: 'c', value: 3 },
	];

	it('returns items in the order of ids', () => {
		const result = expandById(items, ['b', 'a', 'c']);
		expect(result).toEqual([items[1], items[0], items[2]]);
	});

	it('trow for missing ids', () => {
		expect(() => expandById(items, ['a', 'x', 'c'])).toThrow();
	});
});
