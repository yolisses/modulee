import type { GraphRegistry } from '$lib/data/GraphRegistry';
import type { ModuleNodeData } from '$lib/data/variants/ModuleNodeData';
import { ById } from '$lib/editor/ById';
import { expect, test } from 'vitest';
import { mockCommandData } from '../test/mockNodeData';
import { SetModuleNodeModuleReferenceCommand } from './SetModuleNodeModuleReferenceCommand';

test('SetModuleNodeModuleReferenceCommand', () => {
	const graphRegistry = {
		nodes: ById.fromItems([
			{ id: 'node1' },
			{
				id: 'node2',
				type: 'ModuleNode',
				extras: { targetInternalModuleId: 'internalModule1' },
			},
			{ id: 'node3' },
		]),
	} as GraphRegistry;
	const command = new SetModuleNodeModuleReferenceCommand(
		mockCommandData({ moduleNodeId: 'node2', targetInternalModuleId: 'internalModule2' }),
	);

	command.execute(graphRegistry);

	expect((graphRegistry.nodes.get('node2') as ModuleNodeData).extras.moduleReference).toBe(
		'internalModule2',
	);

	command.undo(graphRegistry);

	expect((graphRegistry.nodes.get('node2') as ModuleNodeData).extras.moduleReference).toBe(
		'internalModule1',
	);
});

test('SetModuleNodeModuleReferenceCommand with wrong type', () => {
	const graphRegistry = {
		nodes: ById.fromItems([
			{ id: 'node1' },
			{
				id: 'node2',
				type: 'ModuleNode',
				extras: { targetInternalModuleId: 'internalModule1' },
			},
			{ id: 'node3' },
		]),
	} as GraphRegistry;
	const command = new SetModuleNodeModuleReferenceCommand(
		mockCommandData({ moduleNodeId: 'node3', targetInternalModuleId: 'internalModule1' }),
	);

	expect(() => {
		command.execute(graphRegistry);
	}).toThrow();
});
