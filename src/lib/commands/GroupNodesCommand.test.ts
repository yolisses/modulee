import type { ExtrasData } from '$lib/data/ExtrasData';
import type { GroupData } from '$lib/data/GroupData';
import type { NodeData } from '$lib/data/NodeData';
import { ById } from '$lib/editor/ById.svelte';
import type { EditorData } from '$lib/editor/EditorData';
import { expect, test } from 'vitest';
import { GroupNodesCommand } from './GroupNodesCommand';
import { mockCommandData } from './test/mockNodeData';

test('GroupNodesCommand', () => {
	const editorData = {
		groups: new ById([{ id: 'group1' }]),
		nodes: new ById([
			{ id: 'node1', groupId: 'group1' },
			{ id: 'node2', groupId: 'group1' },
			{ id: 'node3', groupId: 'group1' },
		]),
	} as EditorData;

	const command = new GroupNodesCommand(
		mockCommandData({
			nodesId: ['node1', 'node2'],
			group: { id: 'group2' } as GroupData,
			groupNodeData: {
				id: 'node4',
				groupId: 'group1',
				type: 'GroupNode',
				extras: { targetGroupId: 'group2' } as ExtrasData,
			} as NodeData,
		}),
	);
	command.execute(editorData);

	expect(editorData.groups).toEqual([{ id: 'group1' }, { id: 'group2' }]);
	expect(editorData.nodes).toEqual([
		{ id: 'node1', groupId: 'group2' },
		{ id: 'node2', groupId: 'group2' },
		{ id: 'node3', groupId: 'group1' },
		{
			id: 'node4',
			groupId: 'group1',
			type: 'GroupNode',
			extras: { targetGroupId: 'group2' } as ExtrasData,
		},
	]);

	command.undo(editorData);

	expect(editorData.groups).toEqual([{ id: 'group1' }]);
	expect(editorData.nodes).toEqual([
		{ id: 'node1', groupId: 'group1' },
		{ id: 'node2', groupId: 'group1' },
		{ id: 'node3', groupId: 'group1' },
	]);
});
