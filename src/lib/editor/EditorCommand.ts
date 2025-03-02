import type { GraphData } from '$lib/data/GraphData';
import type { CreateEditorCommandCallback } from './CreateEditorCommandCallback';
import type { EditorCommandData } from './EditorCommandData';
import type { EditorData } from './EditorData';

// TODO find a better name
export abstract class EditorCommand<T = unknown> {
	id: string;
	createCommandCallback!: CreateEditorCommandCallback;

	constructor(public commandData: EditorCommandData<T>) {
		this.id = commandData.id;
	}

	abstract execute(graphData: GraphData, editorData: EditorData): void;
	abstract undo(graphData: GraphData, editorData: EditorData): void;

	get details() {
		return this.commandData.details;
	}
}
