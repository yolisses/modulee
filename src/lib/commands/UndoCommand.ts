import { reinsert } from '$lib/array/reinsert';
import type { Remotion } from '$lib/array/remotion';
import { removeById } from '$lib/array/removeById';
import { Command } from '$lib/editor/Command';
import type { CommandData } from '$lib/editor/CommandData';
import type { EditorData } from '$lib/editor/EditorData';

export class UndoCommand extends Command<{
	commandId: string;
}> {
	command!: Command;
	remotion!: Remotion<CommandData>;

	execute(editorData: EditorData): void {
		this.remotion = removeById(editorData.history, this.details.commandId);
		this.command = this.createCommandCallback(this.remotion.item);
		this.command.undo(editorData);
	}

	undo(editorData: EditorData): void {
		this.command.execute(editorData);
		reinsert(editorData.history, this.remotion);
	}
}
