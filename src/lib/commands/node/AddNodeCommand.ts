import type { NodeData } from '$lib/data/NodeData';
import { Command } from '$lib/editor/Command';
import type { EditorData } from '$lib/editor/EditorData';

export class AddNodeCommand extends Command<{
	node: NodeData;
}> {
	execute(editorData: EditorData): void {
		const { node } = this.details;
		editorData.nodes.add(node);
	}

	undo(editorData: EditorData): void {
		const { node } = this.details;
		editorData.nodes.remove(node);
	}
}
