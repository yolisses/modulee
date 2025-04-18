import type { GraphRegistry } from '$lib/data/GraphRegistry';
import type { CreateEditorCommandCallback } from './CreateEditorCommandCallback';
import type { EditorCommandData } from './EditorCommandData';
import type { EditorData } from './EditorData';

// TODO find a better name
export abstract class EditorCommand<T = unknown> {
	id: string;
	commandData: EditorCommandData<T>;
	createCommandCallback!: CreateEditorCommandCallback;

	constructor(commandData: EditorCommandData<T>) {
		this.id = commandData.id;
		// Uses a clone to prevent hard to find errors
		this.commandData = structuredClone(commandData);
	}

	abstract execute(graphRegistry: GraphRegistry, editorData: EditorData): void;
	abstract undo(graphRegistry: GraphRegistry, editorData: EditorData): void;

	get details() {
		return this.commandData.details;
	}
}
