import { Editor } from '$lib/editor/Editor.svelte';
import { expect, test } from 'vitest';
import type { Node } from '../Node';
import { AddNodeCommand } from './AddNodeCommand';

test('AddNodeCommand', () => {
	const editor = new Editor();
	editor.nodes = [{ id: '1' }, { id: '2' }] as Node[];

	const addNodeCommand = new AddNodeCommand({ id: '3' } as Node);
	addNodeCommand.execute(editor);

	expect(editor.nodes).toEqual([{ id: '1' }, { id: '2' }, { id: '3' }]);

	addNodeCommand.undo(editor);

	expect(editor.nodes).toEqual([{ id: '1' }, { id: '2' }]);
});
