import { test } from 'vitest';
import { z } from 'zod/v4';
import { createId } from './createId';

test('createId', () => {
	const id = createId();
	z.uuid().parse(id);
});
