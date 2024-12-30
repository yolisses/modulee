import { reinsert } from '$lib/array/reinsert';
import type { Remotion } from '$lib/array/remotion';
import { removeById } from '$lib/array/removeById';
import { Command } from '$lib/editor/Command';
import type { EditorData } from '$lib/editor/EditorData';
import type { NodeData } from '../NodeData';

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
