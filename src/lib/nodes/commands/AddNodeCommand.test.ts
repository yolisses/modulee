import { Editor } from '$lib/editor/Editor.svelte';
import { Vector } from '$lib/space/Vector';
import { expect, test } from 'vitest';
import { AddNodeCommand } from './AddNodeCommand';

test('AddNodeCommand', () => {
	const editor = new Editor();
	editor.nodes = [
		{ id: '1', position: Vector.zero(), size: Vector.one() },
		{ id: '2', position: Vector.zero(), size: Vector.one() }
	];

	const addNodeCommand = new AddNodeCommand({
		id: '3',
		position: Vector.zero(),
		size: Vector.one()
	});
	editor.execute(addNodeCommand);

	expect(editor.nodes).toEqual([
		{ id: '1', position: Vector.zero(), size: Vector.one() },
		{ id: '2', position: Vector.zero(), size: Vector.one() },
		{ id: '3', position: Vector.zero(), size: Vector.one() }
	]);
});
