import { describe, expect, it } from 'vitest';
import { getUpdatedObject } from './getUpdatedObject';

describe('getUpdatedObject', () => {
	it('updates properties present in partial', () => {
		const old = { a: 1, b: 2, c: 3 };
		const partial = { b: 20 };
		getUpdatedObject(old, partial);
		expect(old).toEqual({ a: 1, b: 20, c: 3 });
	});

	it('does not update properties not present in partial', () => {
		const old = { x: 'foo', y: 'bar' };
		const partial = {};
		getUpdatedObject(old, partial);
		expect(old).toEqual({ x: 'foo', y: 'bar' });
	});

	it('updates multiple properties', () => {
		const old = { a: 1, b: 2, c: 3 };
		const partial = { a: 10, c: 30 };
		getUpdatedObject(old, partial);
		expect(old).toEqual({ a: 10, b: 2, c: 30 });
	});

	it('ignores properties in partial not present in old', () => {
		const old = { a: 1 };
		const partial = { a: 2, b: 3 };
		getUpdatedObject(old, partial);
		expect(old).toEqual({ a: 2 });
	});

	it('does not update properties if partial value is undefined', () => {
		const old = { a: 1, b: 2 };
		const partial = { a: undefined };
		getUpdatedObject(old, partial);
		expect(old).toEqual({ a: 1, b: 2 });
	});
});
