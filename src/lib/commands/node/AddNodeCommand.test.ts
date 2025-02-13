import type { NodeData } from '$lib/data/NodeData';
import { ById } from '$lib/editor/ById.svelte';
import type { EditorData } from '$lib/editor/EditorData';
import { expect, test } from 'vitest';
import { mockCommandData } from '../test/mockNodeData';
import { AddNodeCommand } from './AddNodeCommand';

test('AddNodeCommand', () => {
	const editorData = {
		nodes: new ById([{ id: 'node1' }, { id: 'node2' }]),
	} as EditorData;

	const command = new AddNodeCommand(mockCommandData({ node: { id: 'node3' } as NodeData }));
	command.execute(editorData);

	expect(editorData.nodes.values()).toEqual([{ id: 'node1' }, { id: 'node2' }, { id: 'node3' }]);

	command.undo(editorData);

	expect(editorData.nodes.values()).toEqual([{ id: 'node1' }, { id: 'node2' }]);
});
