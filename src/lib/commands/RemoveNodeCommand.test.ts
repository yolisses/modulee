import type { EditorData } from '$lib/editor/EditorData';
import { expect, test } from 'vitest';
import { RemoveNodeCommand } from './RemoveNodeCommand';
import { mockCommandData } from './test/mockNodeData';

test('RemoveNodeCommand', () => {
	const editorData = {
		nodes: {
			node1: { id: 'node1' },
			node2: { id: 'node2' },
			node3: { id: 'node3' },
		},
	} as unknown as EditorData;

	const commandDetails = { nodeId: 'node2' };
	const command = new RemoveNodeCommand(mockCommandData(commandDetails));
	command.execute(editorData);

	expect(editorData.nodes).toEqual({
		node1: { id: 'node1' },
		node3: { id: 'node3' },
	});

	command.undo(editorData);

	expect(editorData.nodes).toEqual({
		node1: { id: 'node1' },
		node2: { id: 'node2' },
		node3: { id: 'node3' },
	});
});
