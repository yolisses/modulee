import type { Editor } from './Editor.svelte';

export interface Command {
	execute(editor: Editor): void;
	undo(editor: Editor): void;
}
