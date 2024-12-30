import type { EditorData } from '$lib/editor/EditorData';
import { expect, test } from 'vitest';
import { RemoveNodeCommand } from './RemoveNodeCommand';
import { mockCommandData } from './test/mockNodeData';

test('RemoveNodeCommand', () => {
	const editorData = { nodes: [{ id: '1' }, { id: '2' }, { id: '3' }] } as EditorData;

	const commandDetails = { nodeId: '2' };
	const command = new RemoveNodeCommand(mockCommandData(commandDetails));
	command.execute(editorData);

	expect(editorData.nodes).toEqual([{ id: '1' }, { id: '3' }]);

	command.undo(editorData);

	expect(editorData.nodes).toEqual([{ id: '1' }, { id: '2' }, { id: '3' }]);
});
