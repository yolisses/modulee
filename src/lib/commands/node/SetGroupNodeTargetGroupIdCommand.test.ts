import type { GraphData } from '$lib/data/GraphData';
import type { GroupNodeData } from '$lib/data/variants/GroupNodeData';
import { ById } from '$lib/editor/ById';
import { expect, test } from 'vitest';
import { mockCommandData } from '../test/mockNodeData';
import { SetGroupNodeTargetGroupIdCommand } from './SetGroupNodeTargetGroupIdCommand';

test('SetGroupNodeTargetGroupIdCommand', () => {
	const graphData = {
		nodes: ById.fromItems([
			{ id: 'node1' },
			{ id: 'node2', type: 'GroupNode', extras: { targetGroupId: 'group1' } },
			{ id: 'node3' },
		]),
	} as GraphData;
	const command = new SetGroupNodeTargetGroupIdCommand(
		mockCommandData({ groupNodeId: 'node2', targetGroupId: 'group2' }),
	);

	command.execute(graphData);

	expect((graphData.nodes.get('node2') as GroupNodeData).extras.targetGroupId).toBe('group2');

	command.undo(graphData);

	expect((graphData.nodes.get('node2') as GroupNodeData).extras.targetGroupId).toBe('group1');
});

test('SetGroupNodeTargetGroupIdCommand with wrong type', () => {
	const graphData = {
		nodes: ById.fromItems([
			{ id: 'node1' },
			{ id: 'node2', type: 'GroupNode', extras: { targetGroupId: 'group1' } },
			{ id: 'node3' },
		]),
	} as GraphData;
	const command = new SetGroupNodeTargetGroupIdCommand(
		mockCommandData({ groupNodeId: 'node3', targetGroupId: 'group1' }),
	);

	expect(() => {
		command.execute(graphData);
	}).toThrow();
});
