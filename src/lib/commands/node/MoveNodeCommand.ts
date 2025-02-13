import type { VectorData } from '$lib/data/VectorData';
import { Command } from '$lib/editor/Command';
import type { CommandData } from '$lib/editor/CommandData';
import type { EditorData } from '$lib/editor/EditorData';
import { Vector } from 'nodes-editor';

type MoveNodeCommandDetails = { nodeId: string; delta: VectorData };

export type MoveNodeCommandData = CommandData<MoveNodeCommandDetails>;

export class MoveNodeCommand extends Command<MoveNodeCommandDetails> {
	execute(editorData: EditorData): void {
		const { delta, nodeId } = this.details;
		const node = editorData.nodes.get(nodeId);
		const nodePosition = Vector.fromData(node.position);
		node.position = nodePosition.add(Vector.fromData(delta)).getData();
	}

	undo(editorData: EditorData): void {
		const { delta, nodeId } = this.details;
		const node = editorData.nodes.get(nodeId);
		const nodePosition = Vector.fromData(node.position);
		node.position = nodePosition.subtract(Vector.fromData(delta)).getData();
	}
}
