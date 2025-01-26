import { createId } from '$lib/data/createId';
import type { CommandData } from './CommandData';
import type { EditorData } from './EditorData';
import type { EmptyObject } from './EmptyObject';

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
