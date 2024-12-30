import type { EditorData } from '$lib/editor/EditorData';
import { expect, test } from 'vitest';
import { RemoveNodeCommand } from './RemoveNodeCommand';

test('RemoveNodeCommand', () => {
	const editorData = { nodes: [{ id: '1' }, { id: '2' }, { id: '3' }] } as EditorData;

	const removeNodeCommand = new RemoveNodeCommand('2');
	removeNodeCommand.execute(editorData);

	expect(editorData.nodes).toEqual([{ id: '1' }, { id: '3' }]);

	removeNodeCommand.undo(editorData);

	expect(editorData.nodes).toEqual([{ id: '1' }, { id: '2' }, { id: '3' }]);
});
