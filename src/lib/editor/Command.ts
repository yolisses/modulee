import type { Editor } from './Editor';

export interface Command {
	execute(editor: Editor): void;
	undo(editor: Editor): void;
}
