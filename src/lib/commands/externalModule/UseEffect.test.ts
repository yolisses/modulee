import type { GraphRegistry } from '$lib/data/GraphRegistry';
import { test } from 'vitest';
import { mockCommandData } from '../test/mockNodeData';
import { UseEffect } from './UseEffect';

test('UseEffect', () => {
	const graphRegistry = {} as GraphRegistry;

	const command = mockCommandData<UseEffect>({});
});
