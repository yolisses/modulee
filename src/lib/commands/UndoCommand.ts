import { reinsert } from '$lib/array/reinsert';
import type { Remotion } from '$lib/array/remotion';
import { removeById } from '$lib/array/removeById';
import { Command } from '$lib/editor/Command';
import type { EditorData } from '$lib/editor/EditorData';

export class UndoCommand extends Command<{
	commandId: string;
}> {
	remotion!: Remotion<Command>;

	execute(editorData: EditorData): void {
		this.remotion = removeById(editorData.history, this.details.commandId);
		const command = this.remotion.item;
		editorData.undoneHistory.push(command);
		command.undo(editorData);
	}

	undo(editorData: EditorData): void {
		this.remotion.item.execute(editorData);
		reinsert(editorData.history, this.remotion);
	}
}
