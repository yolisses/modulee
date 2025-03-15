import type { GraphRegistry } from '$lib/data/GraphRegistry';
import { ById } from '$lib/editor/ById';
import { expect, test } from 'vitest';
import { mockCommandData } from '../test/mockNodeData';
import { RemoveExternalModuleReferenceCommand } from './RemoveExternalModuleReferenceCommand';

test('RemoveExternalModuleReferenceCommand', () => {
	const graphRegistry = {
		externalModuleReferences: ById.fromItems([
			{ id: 'externalModuleReference1' },
			{ id: 'externalModuleReference2' },
			{ id: 'externalModuleReference3' },
		]),
	} as GraphRegistry;

	const commandDetails = { externalModuleReferenceId: 'externalModuleReference2' };
	const command = new RemoveExternalModuleReferenceCommand(mockCommandData(commandDetails));
	command.execute(graphRegistry);

	expect(graphRegistry.externalModuleReferences).toEqual(
		ById.fromItems([{ id: 'externalModuleReference1' }, { id: 'externalModuleReference3' }]),
	);

	command.undo(graphRegistry);

	expect(graphRegistry.externalModuleReferences).toEqual(
		ById.fromItems([
			{ id: 'externalModuleReference1' },
			{ id: 'externalModuleReference2' },
			{ id: 'externalModuleReference3' },
		]),
	);
});
