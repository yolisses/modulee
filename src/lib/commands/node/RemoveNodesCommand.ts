import type { GraphData } from '$lib/data/GraphData';
import { EditorCommand } from '$lib/editor/EditorCommand';
import { RemoveNodeCommand, type RemoveNodeCommandData } from './RemoveNodeCommand';

export class RemoveNodesCommand extends EditorCommand<{
	nodeIds: string[];
}> {
	commands!: RemoveNodeCommand[];

	execute(graphData: GraphData): void {
		console.log(this.details.nodeIds);
		this.commands = this.details.nodeIds.map((nodeId) => {
			return new RemoveNodeCommand({
				type: 'RemoveNodeCommand',
				details: { nodeId },
			} as RemoveNodeCommandData);
		});
		this.commands.forEach((command) => {
			command.execute(graphData);
		});
	}

	undo(graphData: GraphData): void {
		this.commands.forEach((command) => {
			command.undo(graphData);
		});
	}
}
