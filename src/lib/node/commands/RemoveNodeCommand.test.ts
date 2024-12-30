import { Editor } from '$lib/editor/Editor.svelte';
import { expect, test } from 'vitest';
import type { Node } from '../Node.svelte';
import { RemoveNodeCommand } from './RemoveNodeCommand';

test('RemoveNodeCommand', () => {
	const editor = new Editor();
	editor.nodes = [{ id: '1' }, { id: '2' }, { id: '3' }] as Node[];

	const removeNodeCommand = new RemoveNodeCommand('2');
	removeNodeCommand.execute(editor);

	expect(editor.nodes).toEqual([{ id: '1' }, { id: '3' }]);

	removeNodeCommand.undo(editor);

	expect(editor.nodes).toEqual([{ id: '1' }, { id: '2' }, { id: '3' }]);
});
