import { test, expect } from 'vitest';
import { reinsert } from './reinsert.js';
import type { Remotion } from './remotion.js';

test('reinsert', () => {
	const items = ['1', '3'];
	const remotion: Remotion<string> = { index: 1, item: '2' };

	reinsert(items, remotion);

	expect(items).toEqual(['1', '2', '3']);
});
