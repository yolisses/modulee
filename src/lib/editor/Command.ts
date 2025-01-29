import type { CommandData } from './CommandData';
import type { CreateCommandCallback } from './CreateCommandCallback';
import type { EditorData } from './EditorData';

export abstract class Command<T = unknown> {
	id: string;
	createCommandCallback!: CreateCommandCallback;

	constructor(public commandData: CommandData<T>) {
		this.id = commandData.id;
	}

	abstract execute(editorData: EditorData): void;
	abstract undo(editorData: EditorData): void;

	get details() {
		return this.commandData.details;
	}
}
