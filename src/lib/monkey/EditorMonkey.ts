import type { EditorCommand } from '$lib/editor/EditorCommand';
import type { EditorData } from '$lib/editor/EditorData';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';

export abstract class EditorMonkey {
	abstract getCanBeUsed(graphRegistry: GraphRegistry, editorData: EditorData): boolean;
	abstract createCommand(graphRegistry: GraphRegistry, editorData: EditorData): EditorCommand;
}
