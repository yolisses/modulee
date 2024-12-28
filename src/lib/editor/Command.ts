import type { Editor } from './Editor.svelte.ts';

export interface Command {
	execute(editor: Editor): void;
	undo(editor: Editor): void;
}
