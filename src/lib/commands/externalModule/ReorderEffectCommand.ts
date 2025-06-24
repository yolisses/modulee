import type { GraphRegistry } from '$lib/data/GraphRegistry';
import { EditorCommand } from '$lib/editor/EditorCommand';

export class ReorderEffectCommand extends EditorCommand<{
	moduleNodeId: string;
}> {
	execute(graphRegistry: GraphRegistry): void {}

	undo(graphRegistry: GraphRegistry): void {
		throw new Error('Method not implemented.');
	}
}
