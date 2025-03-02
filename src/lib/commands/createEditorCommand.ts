import type { EditorCommandData } from '$lib/editor/EditorCommandData';
import { editorCommandClassesByType } from './editorCommandClassesByType';

export function createEditorCommand(editorCommandData: EditorCommandData) {
	const constructor = editorCommandClassesByType[editorCommandData.type];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const command = new constructor(editorCommandData as any);
	command.createCommandCallback = createEditorCommand;
	return command;
}
