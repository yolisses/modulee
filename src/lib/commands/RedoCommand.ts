import type { Remotion } from '$lib/array/remotion';
import { removeById } from '$lib/array/removeById';
import { Command } from '$lib/editor/Command';
import type { EditorData } from '$lib/editor/EditorData';

export class RedoCommand extends Command<{
	commandId: string;
}> {
	remotion!: Remotion<Command>;

	execute(editorData: EditorData): void {
		this.remotion = removeById(editorData.undoneHistory, this.details.commandId);
		const command = this.remotion.item;
		editorData.history.push(command);
		command.execute(editorData);
	}

	undo(): void {
		throw new Error('Method not implemented');
	}
}
