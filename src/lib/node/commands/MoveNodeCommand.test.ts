import type { EditorData } from '$lib/editor/EditorData';
import { expect, test } from 'vitest';
import { MoveNodeCommand } from './MoveNodeCommand';
import { mockCommandData } from './test/mockNodeData';

test('MoveNodeCommand', () => {
	const editorData = {
		nodes: [
			{ id: '1', position: { x: 1, y: 1 } },
			{ id: '2', position: { x: 2, y: 2 } },
			{ id: '2', position: { x: 3, y: 3 } },
		],
	} as EditorData;

	const commandDetails = { nodeId: '2', position: { x: 4, y: 4 } };
	const command = new MoveNodeCommand(mockCommandData(commandDetails));
	command.execute(editorData);

	expect(editorData.nodes[1].position).toEqual({ x: 4, y: 4 });

	command.undo(editorData);

	expect(editorData.nodes[1].position).toEqual({ x: 2, y: 2 });
});
