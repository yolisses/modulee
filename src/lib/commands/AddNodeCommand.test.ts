import type { NodeData } from '$lib/data/NodeData';
import type { EditorData } from '$lib/editor/EditorData';
import { expect, test } from 'vitest';
import { AddNodeCommand } from './AddNodeCommand';
import { mockCommandData } from './test/mockNodeData';

test('AddNodeCommand', () => {
	const editorData = {
		nodes: {
			node1: { id: 'node1' },
			node2: { id: 'node2' },
		},
	} as unknown as EditorData;

	const command = new AddNodeCommand(mockCommandData({ node: { id: '3' } as NodeData }));
	command.execute(editorData);

	expect(editorData.nodes).toEqual({
		node1: { id: 'node1' },
		node2: { id: 'node2' },
		node3: { id: 'node3' },
	});

	command.undo(editorData);

	expect(editorData.nodes).toEqual({
		node1: { id: 'node1' },
		node2: { id: 'node2' },
	});
});
