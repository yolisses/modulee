import type { NodeData } from '$lib/data/NodeData';
import { ById } from '$lib/editor/ById.svelte';
import type { EditorData } from '$lib/editor/EditorData';
import { expect, test } from 'vitest';
import { AddNodeCommand } from './AddNodeCommand';
import { mockCommandData } from './test/mockNodeData';

test('AddNodeCommand', () => {
	const editorData = {
		nodes: new ById([{ id: 'node1' }, { id: 'node2' }]),
	} as unknown as EditorData;

	const command = new AddNodeCommand(mockCommandData({ node: { id: 'node3' } as NodeData }));
	command.execute(editorData);

	expect(editorData.nodes.values()).toEqual([{ id: 'node1' }, { id: 'node2' }, { id: 'node3' }]);

	command.undo(editorData);

	expect(editorData.nodes.values()).toEqual([{ id: 'node1' }, { id: 'node2' }]);
});
