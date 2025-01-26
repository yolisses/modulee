import { test, expect } from 'vitest';
import { reinsert } from './reinsert';
import type { Remotion } from './remotion';

test('reinsert', () => {
	const items = ['1', '3'];
	const remotion: Remotion<string> = { index: 1, item: '2' };

	reinsert(items, remotion);

	expect(items).toEqual(['1', '2', '3']);
});
