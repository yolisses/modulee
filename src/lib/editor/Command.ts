import type { EditorData } from './EditorData';

export interface Command {
	execute(editorData: EditorData): void;
	undo(editorData: EditorData): void;
}
