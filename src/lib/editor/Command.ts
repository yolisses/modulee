import { createId } from '$lib/utils/createId';
import type { EditorData } from './EditorData';

export abstract class Command {
	id: string;

	constructor() {
		this.id = createId();
	}

	abstract execute(editorData: EditorData): void;
	abstract undo(editorData: EditorData): void;
}
