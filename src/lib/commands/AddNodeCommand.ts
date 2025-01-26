import { removeById } from '$lib/array/removeById.js';
import type { NodeData } from '$lib/data/NodeData.js';
import { Command } from '$lib/editor/Command.js';
import type { EditorData } from '$lib/editor/EditorData.js';

export class AddNodeCommand extends Command<{
	node: NodeData;
}> {
	execute(editorData: EditorData): void {
		editorData.nodes.push(this.details.node);
	}

	undo(editorData: EditorData): void {
		removeById(editorData.nodes, this.details.node.id);
	}
}
