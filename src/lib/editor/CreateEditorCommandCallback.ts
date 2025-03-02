import type { EditorCommand } from './EditorCommand';
import type { EditorCommandData } from './EditorCommandData';

export type CreateEditorCommandCallback = (editorCommandData: EditorCommandData) => EditorCommand;
