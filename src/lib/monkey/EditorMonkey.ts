import type { GraphRegistry } from '$lib/data/GraphRegistry';
import type { EditorCommand } from '$lib/editor/EditorCommand';
import type { EditorData } from '$lib/editor/EditorData';

export abstract class EditorMonkey {
	abstract getCanBeUsed(graphRegistry: GraphRegistry, editorData: EditorData): boolean;
	abstract createCommand(graphRegistry: GraphRegistry, editorData: EditorData): EditorCommand;
}
