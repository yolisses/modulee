import { Editor } from '$lib/editor/Editor.svelte';
import { Vector } from '$lib/space/Vector';
import { expect, test } from 'vitest';
import type { Node } from '../Node';
import { MoveNodeCommand } from './MoveNodeCommand';

test('MoveNodeCommand', () => {
	const editor = new Editor();
	editor.nodes = [
		{ id: '1', position: new Vector(1, 1) },
		{ id: '2', position: new Vector(2, 2) },
		{ id: '2', position: new Vector(3, 3) },
	] as Node[];

	const moveNodeCommand = new MoveNodeCommand('2', new Vector(4, 4));
	moveNodeCommand.execute(editor);

	expect(editor.nodes[1].position).toEqual(new Vector(4, 4));

	moveNodeCommand.undo(editor);

	expect(editor.nodes[1].position).toEqual(new Vector(2, 2));
});
