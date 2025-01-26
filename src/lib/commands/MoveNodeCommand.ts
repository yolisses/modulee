import { findById } from '$lib/array/findById.js';
import type { VectorData } from '$lib/data/VectorData.js';
import { Command } from '$lib/editor/Command.js';
import type { EditorData } from '$lib/editor/EditorData.js';

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
