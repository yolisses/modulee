import { findById } from '$lib/array/findById';
import type { VectorData } from '$lib/data/VectorData';
import { Command } from '$lib/editor/Command';
import type { EditorData } from '$lib/editor/EditorData';
import { Vector } from 'nodes-editor';

export class MoveNodeCommand extends Command<{
	nodeId: string;
	delta: VectorData;
}> {
	execute(editorData: EditorData): void {
		const node = findById(editorData.nodes, this.details.nodeId);
		const nodePosition = Vector.fromData(node.position);
		const delta = Vector.fromData(this.details.delta);
		node.position = nodePosition.add(delta).getData();
	}

	undo(editorData: EditorData): void {
		const node = findById(editorData.nodes, this.details.nodeId);
		const nodePosition = Vector.fromData(node.position);
		const delta = Vector.fromData(this.details.delta);
		node.position = nodePosition.subtract(delta).getData();
	}
}
