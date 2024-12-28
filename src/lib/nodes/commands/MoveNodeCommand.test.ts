import { Editor } from '$lib/editor/Editor.svelte';
import { Vector } from '$lib/space/Vector';
import type { Node } from '$lib/types/Node';
import { expect, test } from 'vitest';
import { MoveNodeCommand } from './MoveNodeCommand';

test('MoveNodeCommand', () => {
	const editor = new Editor();
	editor.nodes = [
		{ id: '1', position: new Vector(1, 2) },
		{ id: '2', position: new Vector(3, 4) }
	] as Node[];

	const moveNodeCommand = new MoveNodeCommand('2', new Vector(5, 6));
	moveNodeCommand.execute(editor);

	expect(editor.nodes[1].position).toEqual(new Vector(5, 6));

	moveNodeCommand.undo(editor);

	expect(editor.nodes[1].position).toEqual(new Vector(3, 4));
});
