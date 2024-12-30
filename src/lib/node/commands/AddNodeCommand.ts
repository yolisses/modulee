import { removeById } from '$lib/array/removeById';
import { Command } from '$lib/editor/Command';
import type { EditorData } from '$lib/editor/EditorData';
import type { NodeData } from '../NodeData';

// It is considered that the list have only one item
// per id.
export class AddNodeCommand extends Command {
	constructor(private node: NodeData) {
		super();
	}

	execute(editorData: EditorData): void {
		editorData.nodes.push(this.node);
	}

	undo(editorData: EditorData): void {
		removeById(editorData.nodes, this.node.id);
	}
}
