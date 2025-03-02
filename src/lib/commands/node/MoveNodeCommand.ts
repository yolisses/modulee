import type { GraphData } from '$lib/data/GraphData';
import type { VectorData } from '$lib/data/VectorData';
import type { CommandData } from '$lib/editor/CommandData';
import { EditorCommand } from '$lib/editor/EditorCommand';
import { Vector } from 'nodes-editor';

type MoveNodeCommandDetails = { nodeId: string; delta: VectorData };

export type MoveNodeCommandData = CommandData<MoveNodeCommandDetails>;

export class MoveNodeCommand extends EditorCommand<MoveNodeCommandDetails> {
	execute(graphData: GraphData): void {
		const { delta, nodeId } = this.details;
		const node = graphData.nodes.get(nodeId);
		const nodePosition = Vector.fromData(node.position);
		node.position = nodePosition.add(Vector.fromData(delta)).getData();
	}

	undo(graphData: GraphData): void {
		const { delta, nodeId } = this.details;
		const node = graphData.nodes.get(nodeId);
		const nodePosition = Vector.fromData(node.position);
		node.position = nodePosition.subtract(Vector.fromData(delta)).getData();
	}
}
