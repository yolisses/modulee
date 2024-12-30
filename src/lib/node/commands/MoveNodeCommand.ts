import { findById } from '$lib/array/findById';
import type { Command } from '$lib/editor/Command';
import type { EditorData } from '$lib/editor/EditorData';
import type { VectorData } from '$lib/space/VectorData';

export class MoveNodeCommand implements Command {
	previousPosition!: VectorData;

	constructor(
		private nodeId: string,
		private position: VectorData,
	) {}

	execute(editorData: EditorData): void {
		const node = findById(editorData.nodes, this.nodeId);
		this.previousPosition = node.position;
		node.position = this.position;
	}

	undo(editorData: EditorData): void {
		const node = findById(editorData.nodes, this.nodeId);
		node.position = this.previousPosition;
	}
}
