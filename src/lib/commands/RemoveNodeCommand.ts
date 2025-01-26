import { reinsert } from '$lib/array/reinsert.js';
import type { Remotion } from '$lib/array/remotion.js';
import { removeById } from '$lib/array/removeById.js';
import type { NodeData } from '$lib/data/NodeData.js';
import { Command } from '$lib/editor/Command.js';
import type { EditorData } from '$lib/editor/EditorData.js';

export class RemoveNodeCommand extends Command<{
	nodeId: string;
}> {
	remotion!: Remotion<NodeData>;

	execute(editorData: EditorData): void {
		this.remotion = removeById(editorData.nodes, this.details.nodeId);
	}

	undo(editorData: EditorData): void {
		reinsert(editorData.nodes, this.remotion);
	}
}
