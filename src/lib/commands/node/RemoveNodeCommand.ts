import type { NodeData } from '$lib/data/NodeData';
import { Command } from '$lib/editor/Command';
import type { EditorData } from '$lib/editor/EditorData';

export class RemoveNodeCommand extends Command<{
	nodeId: string;
}> {
	nodeData!: NodeData;

	execute(editorData: EditorData): void {
		this.nodeData = editorData.nodes.removeById(this.details.nodeId);
	}

	undo(editorData: EditorData): void {
		editorData.nodes.add(this.nodeData);
	}
}
