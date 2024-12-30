import { removeById } from '$lib/array/removeById';
import { Command } from '$lib/editor/Command';
import type { EditorData } from '$lib/editor/EditorData';
import type { NodeData } from '../NodeData';

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
