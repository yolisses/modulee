import type { GraphData } from '$lib/data/GraphData';
import type { GroupData } from '$lib/data/GroupData';
import type { GroupNodeData } from '$lib/data/variants/GroupNodeData';
import { ById } from '$lib/editor/ById';
import { expect, test } from 'vitest';
import { mockCommandData } from '../test/mockNodeData';
import { GroupNodesCommand } from './GroupNodesCommand';

test('GroupNodesCommand', () => {
	const graphData = {
		groups: ById.fromItems([{ id: 'group1' }]),
		nodes: ById.fromItems([
			{ id: 'node1', groupId: 'group1' },
			{ id: 'node2', groupId: 'group1' },
			{ id: 'node3', groupId: 'group1' },
		]),
	} as GraphData;

	const command = new GroupNodesCommand(
		mockCommandData({
			nodesId: ['node1', 'node2'],
			group: { id: 'group2' } as GroupData,
			groupNodeData: {
				id: 'node4',
				groupId: 'group1',
				type: 'GroupNode',
				extras: { targetGroupId: 'group2' },
			} as GroupNodeData,
		}),
	);
	command.execute(graphData);

	expect(graphData.groups.values()).toEqual([{ id: 'group1' }, { id: 'group2' }]);
	expect(graphData.nodes.values()).toEqual([
		{ id: 'node1', groupId: 'group2' },
		{ id: 'node2', groupId: 'group2' },
		{ id: 'node3', groupId: 'group1' },
		{
			id: 'node4',
			groupId: 'group1',
			type: 'GroupNode',
			extras: { targetGroupId: 'group2' },
		},
	]);

	command.undo(graphData);

	expect(graphData.groups.values()).toEqual([{ id: 'group1' }]);
	expect(graphData.nodes.values()).toEqual([
		{ id: 'node1', groupId: 'group1' },
		{ id: 'node2', groupId: 'group1' },
		{ id: 'node3', groupId: 'group1' },
	]);
});
