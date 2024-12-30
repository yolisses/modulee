import { reinsert } from '$lib/array/reinsert';
import type { Remotion } from '$lib/array/remotion';
import { removeById } from '$lib/array/removeById';
import type { Command } from '$lib/editor/Command';
import type { EditorData } from '$lib/editor/EditorData';
import type { NodeData } from '../NodeData';

export class RemoveNodeCommand implements Command {
	remotion!: Remotion<NodeData>;

	constructor(private nodeId: string) {}

	execute(editorData: EditorData): void {
		this.remotion = removeById(editorData.nodes, this.nodeId);
	}

	undo(editorData: EditorData): void {
		reinsert(editorData.nodes, this.remotion);
	}
}
