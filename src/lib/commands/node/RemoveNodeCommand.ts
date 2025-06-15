import type { GraphRegistry } from '$lib/data/GraphRegistry';
import type { NodeData } from '$lib/data/NodeData';
import { EditorCommand } from '$lib/editor/EditorCommand';
import type { EditorCommandData } from '$lib/editor/EditorCommandData';

type RemoveNodeCommandDetails = { nodeId: string };

export type RemoveNodeCommandData = EditorCommandData<RemoveNodeCommandDetails>;

export class RemoveNodeCommand extends EditorCommand<RemoveNodeCommandDetails> {
	static name = 'RemoveNodeCommand';

	nodeData?: NodeData;

	execute(graphRegistry: GraphRegistry): void {
		this.nodeData = graphRegistry.nodes.removeById(this.details.nodeId);
	}

	undo(graphRegistry: GraphRegistry): void {
		if (this.nodeData) {
			graphRegistry.nodes.add(this.nodeData);
		}
	}
}
