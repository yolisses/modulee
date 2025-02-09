import { describe, expect, it } from 'vitest';
import { sortJsonObjectKeys } from './sortJsonObjectKeys';

describe('sortJsonObjectKeys', () => {
	it('should sort keys of a simple object', () => {
		const input = { b: 1, a: 2 };
		const output = { a: 2, b: 1 };
		expect(sortJsonObjectKeys(input)).toEqual(output);
	});

	it('should sort keys of a nested object', () => {
		const input = { b: { d: 4, c: 3 }, a: 2 };
		const output = { a: 2, b: { c: 3, d: 4 } };
		expect(sortJsonObjectKeys(input)).toEqual(output);
	});

	it('should sort keys of an array of objects', () => {
		const input = [
			{ b: 1, a: 2 },
			{ d: 4, c: 3 },
		];
		const output = [
			{ a: 2, b: 1 },
			{ c: 3, d: 4 },
		];
		expect(sortJsonObjectKeys(input)).toEqual(output);
	});

	it('should handle null values', () => {
		const input = { b: null, a: 2 };
		const output = { a: 2, b: null };
		expect(sortJsonObjectKeys(input)).toEqual(output);
	});

	it('should handle non-object values', () => {
		const input = 42;
		const output = 42;
		expect(sortJsonObjectKeys(input)).toEqual(output);
	});
});
