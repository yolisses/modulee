import { removeById } from '$lib/array/removeById';
import type { Command } from '$lib/editor/Command';
import type { EditorData } from '$lib/editor/EditorData';
import type { NodeData } from '../NodeData';

// It is considered that the list have only one item
// per id.
export class AddNodeCommand implements Command {
	constructor(private node: NodeData) {}

	execute(editor: EditorData): void {
		editor.nodes.push(this.node);
	}

	undo(editor: EditorData): void {
		removeById(editor.nodes, this.node.id);
	}
}
