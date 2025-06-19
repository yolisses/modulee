import type { GraphRegistry } from '$lib/data/GraphRegistry';
import { test } from 'vitest';
import { mockCommandData } from '../test/mockNodeData';
import { UseEffectCommand } from './UseEffectCommand';

test('UseEffectCommand', () => {
	const graphRegistry = {} as GraphRegistry;

	const command = mockCommandData<UseEffectCommand>({});
});
