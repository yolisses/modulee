import { setContext } from 'svelte';
import type { Editor } from './Editor.svelte';

export type EditorContext = {
	editor: Editor;
};

export const editorContextKey = Symbol('editorContextKey');

export function setEditorContext(editorContext: EditorContext) {
	setContext(editorContextKey, editorContext);
}
