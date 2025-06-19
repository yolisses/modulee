import type { GraphRegistry } from '$lib/data/GraphRegistry';
import type { EditorCommand } from '$lib/editor/EditorCommand';

export abstract class EditorMonkey {
	abstract getCanBeUsed(graphRegistry: GraphRegistry): boolean;
	abstract createCommand(graphRegistry: GraphRegistry): EditorCommand;
}
