import { expect, test } from 'vitest';
import { createId } from './createId';

test('createId', () => {
	const id = createId();
	expect(typeof id).toBe('string');
});
