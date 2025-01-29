import { getContextOrThrow } from '$lib/ui/getContextOrThrow';
import { setContext } from 'svelte';
import type { Editor } from './Editor.svelte';

export type EditorContext = {
	editor: Editor;
};

const editorContextKey = Symbol('editorContextKey');

export function setEditorContext(editorContext: EditorContext) {
	setContext(editorContextKey, editorContext);
}

export function getEditorContext() {
	return getContextOrThrow<EditorContext>(editorContextKey);
}
