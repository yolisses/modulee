import type { GraphRegistry } from '$lib/data/GraphRegistry';
import { ById } from '$lib/editor/ById';
import { expect, test } from 'vitest';
import { mockCommandData } from '../test/mockNodeData';
import { RenameInternalModuleCommand } from './RenameInternalModuleCommand';

test('RenameInternalModuleCommand', () => {
	const graphRegistry = {
		internalModules: ById.fromItems([
			{ id: 'internalModule1' },
			{ id: 'internalModule2', name: 'name1' },
			{ id: 'internalModule3' },
		]),
	} as GraphRegistry;

	const commandDetails = { internalModuleId: 'internalModule2', name: 'name2' };
	const command = new RenameInternalModuleCommand(mockCommandData(commandDetails));
	command.execute(graphRegistry);

	expect(graphRegistry.internalModules.get('internalModule2').name).toEqual('name2');

	command.undo(graphRegistry);

	expect(graphRegistry.internalModules.get('internalModule2').name).toEqual('name1');
});
