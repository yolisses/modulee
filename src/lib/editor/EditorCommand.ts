import type { GraphData } from '$lib/data/GraphData';
import type { CommandData } from './CommandData';
import type { CreateCommandCallback } from './CreateCommandCallback';
import type { EditorData } from './EditorData';

// TODO find a better name
export abstract class EditorCommand<T = unknown> {
	id: string;
	createCommandCallback!: CreateCommandCallback;

	constructor(public commandData: CommandData<T>) {
		this.id = commandData.id;
	}

	abstract execute(graphData: GraphData, editorData: EditorData): void;
	abstract undo(graphData: GraphData, editorData: EditorData): void;

	get details() {
		return this.commandData.details;
	}
}
