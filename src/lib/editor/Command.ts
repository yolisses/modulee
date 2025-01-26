import { createId } from '$lib/data/createId.js';
import type { CommandData } from './CommandData.js';
import type { EditorData } from './EditorData.js';
import type { EmptyObject } from './EmptyObject.js';

export abstract class Command<T = EmptyObject> {
	id: string;

	constructor(public commandData: CommandData<T>) {
		this.id = createId();
	}

	abstract execute(editorData: EditorData): void;
	abstract undo(editorData: EditorData): void;

	get details() {
		return this.commandData.details;
	}
}
