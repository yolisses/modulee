import type { GraphRegistry } from '$lib/data/GraphRegistry';
import type { VectorData } from '$lib/data/VectorData';
import { EditorCommand } from '$lib/editor/EditorCommand';
import type { EditorCommandData } from '$lib/editor/EditorCommandData';
import { Vector } from 'nodes-editor';

type MoveNodeCommandDetails = { nodeId: string; delta: VectorData };

export type MoveNodeCommandData = EditorCommandData<MoveNodeCommandDetails>;

export class MoveNodeCommand extends EditorCommand<MoveNodeCommandDetails> {
	execute(graphData: GraphRegistry): void {
		const { delta, nodeId } = this.details;
		const node = graphData.nodes.get(nodeId);
		const nodePosition = Vector.fromData(node.position);
		node.position = nodePosition.add(Vector.fromData(delta)).getData();
	}

	undo(graphData: GraphRegistry): void {
		const { delta, nodeId } = this.details;
		const node = graphData.nodes.get(nodeId);
		const nodePosition = Vector.fromData(node.position);
		node.position = nodePosition.subtract(Vector.fromData(delta)).getData();
	}
}
