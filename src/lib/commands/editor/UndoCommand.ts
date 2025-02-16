import type { Remotion } from '$lib/array/remotion';
import { removeById } from '$lib/array/removeById';
import type { GraphData } from '$lib/data/GraphData';
import { Command } from '$lib/editor/Command';
import type { EditorData } from '$lib/editor/EditorData';

export class UndoCommand extends Command<{
	commandId: string;
}> {
	remotion!: Remotion<Command>;

	execute(graphData: GraphData, editorData: EditorData): void {
		this.remotion = removeById(editorData.history, this.details.commandId);
		const command = this.remotion.item;
		editorData.undoneHistory.push(command);
		command.undo(graphData, editorData);
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	undo(graphData: GraphData, editorData: EditorData): void {
		throw new Error('Method not implemented');
	}
}
