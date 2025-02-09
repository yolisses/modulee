import { ById } from '$lib/editor/ById.svelte';
import type { EditorData } from '$lib/editor/EditorData';
import { expect, test } from 'vitest';
import { RemoveNodeCommand } from './RemoveNodeCommand';
import { mockCommandData } from './test/mockNodeData';

test('RemoveNodeCommand', () => {
	const editorData = {
		nodes: new ById([{ id: 'node1' }, { id: 'node2' }, { id: 'node3' }]),
	} as EditorData;

	const commandDetails = { nodeId: 'node2' };
	const command = new RemoveNodeCommand(mockCommandData(commandDetails));
	command.execute(editorData);

	expect(editorData.nodes).toEqual(new ById([{ id: 'node1' }, { id: 'node3' }]));

	command.undo(editorData);

	expect(editorData.nodes).toEqual(new ById([{ id: 'node1' }, { id: 'node2' }, { id: 'node3' }]));
});
