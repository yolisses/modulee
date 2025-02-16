import type { GroupNodeData } from '$lib/data/variants/GroupNodeData';
import { ById } from '$lib/editor/ById.svelte';
import type { EditorData } from '$lib/editor/EditorData';
import { expect, test } from 'vitest';
import { mockCommandData } from '../test/mockNodeData';
import { SetGroupNodeTargetGroupIdCommand } from './SetGroupNodeTargetGroupIdCommand';

test('SetGroupNodeTargetGroupIdCommand', () => {
	const editorData = {
		nodes: new ById([
			{ id: 'node1' },
			{ id: 'node2', type: 'GroupNode', extras: { targetGroupId: 'group1' } },
			{ id: 'node3' },
		]),
	} as EditorData;
	const command = new SetGroupNodeTargetGroupIdCommand(
		mockCommandData({ groupNodeId: 'node2', targetGroupId: 'group2' }),
	);

	command.execute(editorData);

	expect((editorData.nodes.get('node2') as GroupNodeData).extras.targetGroupId).toBe('group2');

	command.undo(editorData);

	expect((editorData.nodes.get('node2') as GroupNodeData).extras.targetGroupId).toBe('group1');
});

test('SetGroupNodeTargetGroupIdCommand with wrong type', () => {
	const editorData = {
		nodes: new ById([
			{ id: 'node1' },
			{ id: 'node2', type: 'GroupNode', extras: { targetGroupId: 'group1' } },
			{ id: 'node3' },
		]),
	} as EditorData;
	const command = new SetGroupNodeTargetGroupIdCommand(
		mockCommandData({ groupNodeId: 'node3', targetGroupId: 'group1' }),
	);

	expect(() => {
		command.execute(editorData);
	}).toThrow();
});
