import type { GraphRegistry } from '$lib/data/GraphRegistry';
import { EditorCommand } from '$lib/editor/EditorCommand';
import { RemoveNodeCommand, type RemoveNodeCommandData } from './RemoveNodeCommand';

export class RemoveNodesCommand extends EditorCommand<{
	nodeIds: string[];
}> {
	commands!: RemoveNodeCommand[];

	execute(graphRegistry: GraphRegistry): void {
		this.commands = this.details.nodeIds.map((nodeId) => {
			return new RemoveNodeCommand({
				type: 'RemoveNodeCommand',
				details: { nodeId },
			} as RemoveNodeCommandData);
		});
		this.commands.forEach((command) => {
			command.execute(graphRegistry);
		});
	}

	undo(graphRegistry: GraphRegistry): void {
		this.commands.forEach((command) => {
			command.undo(graphRegistry);
		});
	}
}
