import type { GraphRegistry } from '$lib/data/GraphRegistry';
import { ById } from '$lib/editor/ById';
import { expect, test } from 'vitest';
import { mockCommandData } from '../test/mockNodeData';
import { RemoveInternalModuleCommand } from './RemoveInternalModuleCommand';

test('RemoveInternalModuleCommand', () => {
	const graphRegistry = {
		internalModules: ById.fromItems([
			{ id: 'internalModule1' },
			{ id: 'internalModule2' },
			{ id: 'internalModule3' },
		]),
	} as GraphRegistry;

	const commandDetails = { internalModuleId: 'internalModule2' };
	const command = new RemoveInternalModuleCommand(mockCommandData(commandDetails));
	command.execute(graphRegistry);

	expect(graphRegistry.internalModules).toEqual(
		ById.fromItems([{ id: 'internalModule1' }, { id: 'internalModule3' }]),
	);

	command.undo(graphRegistry);

	expect(graphRegistry.internalModules).toEqual(
		ById.fromItems([
			{ id: 'internalModule1' },
			{ id: 'internalModule2' },
			{ id: 'internalModule3' },
		]),
	);
});
