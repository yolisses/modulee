import type { GraphRegistry } from '$lib/data/GraphRegistry';
import type { InternalModuleNodeData } from '$lib/data/variants/InternalModuleNodeData';
import { ById } from '$lib/editor/ById';
import { expect, test } from 'vitest';
import { mockCommandData } from '../test/mockNodeData';
import { SetInternalModuleNodeTargetInternalModuleIdCommand } from './SetInternalModuleNodeTargetInternalModuleIdCommand';

test('SetInternalModuleNodeTargetInternalModuleIdCommand', () => {
	const graphRegistry = {
		nodes: ById.fromItems([
			{ id: 'node1' },
			{
				id: 'node2',
				type: 'InternalModuleNode',
				extras: { targetInternalModuleId: 'internalModule1' },
			},
			{ id: 'node3' },
		]),
	} as GraphRegistry;
	const command = new SetInternalModuleNodeTargetInternalModuleIdCommand(
		mockCommandData({ internalModuleNodeId: 'node2', targetInternalModuleId: 'internalModule2' }),
	);

	command.execute(graphRegistry);

	expect(
		(graphRegistry.nodes.get('node2') as InternalModuleNodeData).extras.targetInternalModuleId,
	).toBe('internalModule2');

	command.undo(graphRegistry);

	expect(
		(graphRegistry.nodes.get('node2') as InternalModuleNodeData).extras.targetInternalModuleId,
	).toBe('internalModule1');
});

test('SetInternalModuleNodeTargetInternalModuleIdCommand with wrong type', () => {
	const graphRegistry = {
		nodes: ById.fromItems([
			{ id: 'node1' },
			{
				id: 'node2',
				type: 'InternalModuleNode',
				extras: { targetInternalModuleId: 'internalModule1' },
			},
			{ id: 'node3' },
		]),
	} as GraphRegistry;
	const command = new SetInternalModuleNodeTargetInternalModuleIdCommand(
		mockCommandData({ internalModuleNodeId: 'node3', targetInternalModuleId: 'internalModule1' }),
	);

	expect(() => {
		command.execute(graphRegistry);
	}).toThrow();
});
