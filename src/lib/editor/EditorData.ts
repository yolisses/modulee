import type { EditorCommand } from './EditorCommand';

export type EditorData = {
	history: EditorCommand[];
	undoneHistory: EditorCommand[];
};
