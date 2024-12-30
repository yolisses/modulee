import type { EditorData } from '$lib/editor/EditorData';
import { expect, test } from 'vitest';
import type { Node } from '../Node.svelte';
import { AddNodeCommand } from './AddNodeCommand';

test('AddNodeCommand', () => {
	const editorData = { nodes: [{ id: '1' }, { id: '2' }] } as EditorData;

	const addNodeCommand = new AddNodeCommand({ id: '3' } as Node);
	addNodeCommand.execute(editorData);

	expect(editorData.nodes).toEqual([{ id: '1' }, { id: '2' }, { id: '3' }]);

	addNodeCommand.undo(editorData);

	expect(editorData.nodes).toEqual([{ id: '1' }, { id: '2' }]);
});
