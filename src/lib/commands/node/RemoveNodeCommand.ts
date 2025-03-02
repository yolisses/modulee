import type { GraphData } from '$lib/data/GraphData';
import type { NodeData } from '$lib/data/NodeData';
import { EditorCommand } from '$lib/editor/EditorCommand';

export class RemoveNodeCommand extends EditorCommand<{
	nodeId: string;
}> {
	static name = 'RemoveNodeCommand';

	nodeData!: NodeData;

	execute(graphData: GraphData): void {
		this.nodeData = graphData.nodes.removeById(this.details.nodeId);
	}

	undo(graphData: GraphData): void {
		graphData.nodes.add(this.nodeData);
	}
}
