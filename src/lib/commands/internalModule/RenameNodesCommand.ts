import { EditorCommand } from '$lib/editor/EditorCommand';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';

export class RenameNodesCommand extends EditorCommand<{
	name: string | undefined;
	nodesId: string[];
}> {
	previousNamesById!: Record<string, string | undefined>;

	execute(graphRegistry: GraphRegistry): void {
		const { nodesId, name } = this.details;

		this.previousNamesById = {};
		graphRegistry.nodes.values().forEach((nodeData) => {
			if (nodesId.includes(nodeData.id)) {
				this.previousNamesById[nodeData.id] = nodeData.name;
				nodeData.name = name;
			}
		});
	}

	undo(graphRegistry: GraphRegistry): void {
		Object.entries(this.previousNamesById).forEach(([nodeId, previousName]) => {
			const nodeData = graphRegistry.nodes.get(nodeId);
			if (nodeData) {
				nodeData.name = previousName;
			}
		});
	}
}
