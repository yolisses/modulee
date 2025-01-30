import type { VectorData } from '$lib/data/VectorData';
import { Command } from '$lib/editor/Command';
import type { EditorData } from '$lib/editor/EditorData';
import { MoveNodeCommand, type MoveNodeCommandData } from './MoveNodeCommand';

export class MoveNodesCommand extends Command<{
	nodeIds: string[];
	delta: VectorData;
}> {
	commands!: MoveNodeCommand[];

	execute(editorData: EditorData): void {
		this.commands = this.details.nodeIds.map((nodeId) => {
			return new MoveNodeCommand({
				type: 'MoveNodeCommand',
				details: { nodeId, delta: this.details.delta },
			} as MoveNodeCommandData);
		});
		this.commands.forEach((command) => {
			command.execute(editorData);
		});
	}

	undo(editorData: EditorData): void {
		this.commands.forEach((command) => {
			command.undo(editorData);
		});
	}
}
