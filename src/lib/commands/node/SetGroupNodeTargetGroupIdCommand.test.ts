import type { GraphRegistry } from '$lib/data/GraphRegistry';
import type { GroupNodeData } from '$lib/data/variants/GroupNodeData';
import { ById } from '$lib/editor/ById';
import { expect, test } from 'vitest';
import { mockCommandData } from '../test/mockNodeData';
import { SetGroupNodeTargetGroupIdCommand } from './SetGroupNodeTargetGroupIdCommand';

test('SetGroupNodeTargetGroupIdCommand', () => {
	const graphRegistry = {
		nodes: ById.fromItems([
			{ id: 'node1' },
			{ id: 'node2', type: 'GroupNode', extras: { targetGroupId: 'group1' } },
			{ id: 'node3' },
		]),
	} as GraphRegistry;
	const command = new SetGroupNodeTargetGroupIdCommand(
		mockCommandData({ groupNodeId: 'node2', targetGroupId: 'group2' }),
	);

	command.execute(graphRegistry);

	expect((graphRegistry.nodes.get('node2') as GroupNodeData).extras.targetGroupId).toBe('group2');

	command.undo(graphRegistry);

	expect((graphRegistry.nodes.get('node2') as GroupNodeData).extras.targetGroupId).toBe('group1');
});

test('SetGroupNodeTargetGroupIdCommand with wrong type', () => {
	const graphRegistry = {
		nodes: ById.fromItems([
			{ id: 'node1' },
			{ id: 'node2', type: 'GroupNode', extras: { targetGroupId: 'group1' } },
			{ id: 'node3' },
		]),
	} as GraphRegistry;
	const command = new SetGroupNodeTargetGroupIdCommand(
		mockCommandData({ groupNodeId: 'node3', targetGroupId: 'group1' }),
	);

	expect(() => {
		command.execute(graphRegistry);
	}).toThrow();
});
