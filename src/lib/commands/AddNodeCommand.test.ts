import type { NodeData } from '$lib/data/NodeData';
import type { EditorData } from '$lib/editor/EditorData';
import { expect, test } from 'vitest';
import { AddNodeCommand } from './AddNodeCommand';
import { mockCommandData } from './test/mockNodeData';

test('AddNodeCommand', () => {
	const editorData = { nodes: [{ id: '1' }, { id: '2' }] } as EditorData;

	const command = new AddNodeCommand(
		mockCommandData({
			node: { id: '3' } as NodeData,
		}),
	);
	command.execute(editorData);

	expect(editorData.nodes).toEqual([{ id: '1' }, { id: '2' }, { id: '3' }]);

	command.undo(editorData);

	expect(editorData.nodes).toEqual([{ id: '1' }, { id: '2' }]);
});
