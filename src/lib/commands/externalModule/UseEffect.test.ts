import type { GraphRegistry } from '$lib/data/GraphRegistry';
import { ById } from '$lib/editor/ById';
import { expect, test } from 'vitest';
import { mockCommandData } from '../test/mockNodeData';
import { UseEffect } from './UseEffect';

test('UseEffect', () => {
	const graphRegistry = {
		internalModules: ById.fromItems([{ id: 'internalModule1' }]),
	} as GraphRegistry;

	const command = new UseEffect(mockCommandData({ internalModule: { id: 'internalModule2' } }));
	command.execute(graphRegistry);

	expect(graphRegistry.internalModules.values()).toEqual([
		{ id: 'internalModule1' },
		{ id: 'internalModule2' },
	]);

	command.undo(graphRegistry);

	expect(graphRegistry.internalModules.values()).toEqual([{ id: 'internalModule1' }]);
});
