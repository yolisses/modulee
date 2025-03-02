import type { GraphData } from '$lib/data/GraphData';
import type { VectorData } from '$lib/data/VectorData';
import { EditorCommand } from '$lib/editor/EditorCommand';
import { MoveNodeCommand, type MoveNodeCommandData } from './MoveNodeCommand';

export class MoveNodesCommand extends EditorCommand<{
	nodeIds: string[];
	delta: VectorData;
}> {
	commands!: MoveNodeCommand[];

	execute(graphData: GraphData): void {
		this.commands = this.details.nodeIds.map((nodeId) => {
			return new MoveNodeCommand({
				type: 'MoveNodeCommand',
				details: { nodeId, delta: this.details.delta },
			} as MoveNodeCommandData);
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
