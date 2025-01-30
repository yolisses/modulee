import type { EditorData } from '$lib/editor/EditorData';
import { expect, test } from 'vitest';
import { MoveNodesCommand } from './MoveNodesCommand';
import { mockCommandData } from './test/mockNodeData';

test('MoveNodesCommand', () => {
	const editorData = {
		nodes: [
			{ id: '1', position: { x: 1, y: 1 } },
			{ id: '2', position: { x: 2, y: 2 } },
			{ id: '3', position: { x: 3, y: 3 } },
		],
	} as EditorData;

	const command = new MoveNodesCommand(
		mockCommandData({
			nodeIds: ['2', '3'],
			delta: { x: 4, y: 4 },
		}),
	);
	command.execute(editorData);

	expect(editorData.nodes[1].position).toEqual({ x: 6, y: 6 });
	expect(editorData.nodes[2].position).toEqual({ x: 7, y: 7 });

	command.undo(editorData);

	expect(editorData.nodes[1].position).toEqual({ x: 2, y: 2 });
	expect(editorData.nodes[2].position).toEqual({ x: 3, y: 3 });
});
