import type { GraphRegistry } from '$lib/data/GraphRegistry';
import type { InternalModuleData } from '$lib/data/InternalModuleData';
import { ById } from '$lib/editor/ById';
import { expect, test } from 'vitest';
import { mockCommandData } from '../test/mockNodeData';
import { UseEffectExternalModule } from './UseEffectExternalModule';

test('UseEffectExternalModule', () => {
	const graphRegistry = {
		internalModules: ById.fromItems([{ id: 'internalModule1' }]),
	} as GraphRegistry;

	const command = new UseEffectExternalModule(
		mockCommandData({ internalModule: { id: 'internalModule2' } as InternalModuleData }),
	);
	command.execute(graphRegistry);

	expect(graphRegistry.internalModules.values()).toEqual([
		{ id: 'internalModule1' },
		{ id: 'internalModule2' },
	]);

	command.undo(graphRegistry);

	expect(graphRegistry.internalModules.values()).toEqual([{ id: 'internalModule1' }]);
});
