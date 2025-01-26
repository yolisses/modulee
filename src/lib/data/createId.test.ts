import { test, expect } from 'vitest';
import { createId } from './createId.js';

test('createId', () => {
	const id = createId();
	expect(typeof id).toBe('string');
});
