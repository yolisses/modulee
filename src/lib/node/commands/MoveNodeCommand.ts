import { findById } from '$lib/array/findById';
import { Command } from '$lib/editor/Command';
import type { EditorData } from '$lib/editor/EditorData';
import type { VectorData } from '$lib/space/VectorData';

export class MoveNodeCommand extends Command<{
	nodeId: string;
	position: VectorData;
}> {
	previousPosition!: VectorData;

	execute(editorData: EditorData): void {
		const node = findById(editorData.nodes, this.details.nodeId);
		this.previousPosition = node.position;
		node.position = this.details.position;
	}

	undo(editorData: EditorData): void {
		const node = findById(editorData.nodes, this.details.nodeId);
		node.position = this.previousPosition;
	}
}
