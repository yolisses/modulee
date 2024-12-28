import type { Editor } from './editor';

export interface Command {
	execute(editor: Editor): void;
	undo(editor: Editor): void;
}
