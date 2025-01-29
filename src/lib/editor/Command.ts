import { createId } from '$lib/data/createId';
import type { CommandData } from './CommandData';
import type { CreateCommandCallback } from './CreateCommandCallback';
import type { EditorData } from './EditorData';

export abstract class Command<T = unknown> {
	id: string;
	createCommandCallback!: CreateCommandCallback;

	constructor(public commandData: CommandData<T>) {
		this.id = createId();
	}

	abstract execute(editorData: EditorData): void;
	abstract undo(editorData: EditorData): void;

	get details() {
		return this.commandData.details;
	}
}
