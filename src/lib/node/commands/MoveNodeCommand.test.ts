import type { EditorData } from '$lib/editor/EditorData';
import { expect, test } from 'vitest';
import { MoveNodeCommand } from './MoveNodeCommand';

test('MoveNodeCommand', () => {
	const editorData = {
		nodes: [
			{ id: '1', position: { x: 1, y: 1 } },
			{ id: '2', position: { x: 2, y: 2 } },
			{ id: '2', position: { x: 3, y: 3 } },
		],
	} as EditorData;

	const moveNodeCommand = new MoveNodeCommand('2', { x: 4, y: 4 });
	moveNodeCommand.execute(editorData);

	expect(editorData.nodes[1].position).toEqual({ x: 4, y: 4 });

	moveNodeCommand.undo(editorData);

	expect(editorData.nodes[1].position).toEqual({ x: 2, y: 2 });
});
