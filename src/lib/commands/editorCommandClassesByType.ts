import type { EditorCommandClass } from '$lib/commands/EditorCommandClass';
import { editorCommandClasses } from './editorCommandClasses';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const editorCommandClassesByType: Record<string, EditorCommandClass<any>> = {};

editorCommandClasses.forEach((commandClass) => {
	editorCommandClassesByType[commandClass.name] = commandClass;
});
