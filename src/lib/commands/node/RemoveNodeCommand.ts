import type { GraphData } from '$lib/data/GraphData';
import type { NodeData } from '$lib/data/NodeData';
import { EditorCommand } from '$lib/editor/EditorCommand';
import type { EditorCommandData } from '$lib/editor/EditorCommandData';

type RemoveNodeCommandDetails = { nodeId: string };

export type RemoveNodeCommandData = EditorCommandData<RemoveNodeCommandDetails>;

export class RemoveNodeCommand extends EditorCommand<RemoveNodeCommandDetails> {
	static name = 'RemoveNodeCommand';

	nodeData!: NodeData;

	execute(graphData: GraphData): void {
		this.nodeData = graphData.nodes.removeById(this.details.nodeId);
	}

	undo(graphData: GraphData): void {
		graphData.nodes.add(this.nodeData);
	}
}
