import type { GraphRegistry } from '$lib/data/GraphRegistry';
import type { NodeData } from '$lib/data/NodeData';
import { EditorCommand } from '$lib/editor/EditorCommand';
import type { EditorCommandData } from '$lib/editor/EditorCommandData';

type RemoveNodeCommandDetails = { nodeId: string };

export type RemoveNodeCommandData = EditorCommandData<RemoveNodeCommandDetails>;

export class RemoveNodeCommand extends EditorCommand<RemoveNodeCommandDetails> {
	static name = 'RemoveNodeCommand';

	nodeData!: NodeData;

	execute(graphData: GraphRegistry): void {
		this.nodeData = graphData.nodes.removeById(this.details.nodeId);
	}

	undo(graphData: GraphRegistry): void {
		graphData.nodes.add(this.nodeData);
	}
}
