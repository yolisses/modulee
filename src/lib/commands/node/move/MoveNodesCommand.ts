import { EditorCommand } from '$lib/editor/EditorCommand';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import type { VectorData } from '$lib/node/actionCommands/VectorData';
import { mockCommandData } from '../../test/mockNodeData';
import { MoveNodeCommand } from './MoveNodeCommand';

export class MoveNodesCommand extends EditorCommand<{
	nodeIds: string[];
	delta: VectorData;
}> {
	commands!: MoveNodeCommand[];

	execute(graphRegistry: GraphRegistry): void {
		this.commands = this.details.nodeIds.map((nodeId) => {
			return new MoveNodeCommand(
				mockCommandData({
					nodeId,
					delta: this.details.delta,
				}),
			);
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
