import type { ExternalModuleReference } from '$lib/data/ExternalModuleReference';
import type { GraphRegistry } from '$lib/data/GraphRegistry';
import { ById } from '$lib/editor/ById';
import { expect, test } from 'vitest';
import { mockCommandData } from '../test/mockNodeData';
import { SetExternalModuleReferenceCommand } from './SetExternalModuleReferenceCommand';

test('SetExternalModuleReferenceCommand', () => {
	const graphRegistry = {
		externalModuleReferences: ById.fromItems([{ id: 'externalModuleReference1' }]),
	} as GraphRegistry;

	const command = new SetExternalModuleReferenceCommand(
		mockCommandData({
			externalModuleReference: { id: 'externalModuleReference2' } as ExternalModuleReference,
		}),
	);
	command.execute(graphRegistry);

	expect(graphRegistry.externalModuleReferences.values()).toEqual([
		{ id: 'externalModuleReference1' },
		{ id: 'externalModuleReference2' },
	]);

	command.undo(graphRegistry);

	expect(graphRegistry.externalModuleReferences.values()).toEqual([
		{ id: 'externalModuleReference1' },
	]);
});

test('SetExternalModuleReferenceCommand already present', () => {
	const graphRegistry = {
		externalModuleReferences: ById.fromItems([
			{ id: 'externalModuleReference1' },
			{ id: 'externalModuleReference2' },
		]),
	} as GraphRegistry;

	const command = new SetExternalModuleReferenceCommand(
		mockCommandData({
			externalModuleReference: { id: 'externalModuleReference2' } as ExternalModuleReference,
		}),
	);
	command.execute(graphRegistry);

	expect(graphRegistry.externalModuleReferences.values()).toEqual([
		{ id: 'externalModuleReference1' },
		{ id: 'externalModuleReference2' },
	]);

	command.undo(graphRegistry);

	expect(graphRegistry.externalModuleReferences.values()).toEqual([
		{ id: 'externalModuleReference1' },
		{ id: 'externalModuleReference2' },
	]);
});
