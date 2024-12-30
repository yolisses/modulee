import { removeById } from '$lib/array/removeById';
import type { Command } from '$lib/editor/Command';
import type { Editor } from '$lib/editor/Editor.svelte';
import type { Node } from '../Node.svelte';

// It is considered that the list have only one item
// per id.
export class AddNodeCommand implements Command {
	constructor(private node: Node) {}

	execute(editor: Editor): void {
		editor.nodes.push(this.node);
	}

	undo(editor: Editor): void {
		removeById(editor.nodes, this.node.id);
	}
}
