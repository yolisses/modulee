import { ById } from '$lib/editor/ById.svelte';
import type { EditorData } from '$lib/editor/EditorData';
import { expect, test } from 'vitest';
import { MoveNodesCommand } from './MoveNodesCommand';
import { mockCommandData } from './test/mockNodeData';

test('MoveNodesCommand', () => {
	const editorData = {
		nodes: new ById([
			{ id: 'node1', position: { x: 1, y: 1 } },
			{ id: 'node2', position: { x: 2, y: 2 } },
			{ id: 'node3', position: { x: 3, y: 3 } },
		]),
	} as EditorData;

	const command = new MoveNodesCommand(
		mockCommandData({
			delta: { x: 4, y: 4 },
			nodeIds: ['node2', 'node3'],
		}),
	);
	command.execute(editorData);

	expect(editorData.nodes.get('node2').position).toEqual({ x: 6, y: 6 });
	expect(editorData.nodes.get('node3').position).toEqual({ x: 7, y: 7 });

	command.undo(editorData);

	expect(editorData.nodes.get('node2').position).toEqual({ x: 2, y: 2 });
	expect(editorData.nodes.get('node3').position).toEqual({ x: 3, y: 3 });
});
