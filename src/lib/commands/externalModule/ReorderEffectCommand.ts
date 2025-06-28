import type { GraphRegistry } from '$lib/data/GraphRegistry';
import { EditorCommand } from '$lib/editor/EditorCommand';

/**
 * Move an effect in the effect chain:
 *
 * 1. Replace audio input connections targets from the module node to its target
 *    node (if any).
 * 2. Replace
 */
export class ReorderEffectCommand extends EditorCommand<{
	moduleNodeId: string;
}> {
	execute(graphRegistry: GraphRegistry): void {}

	undo(graphRegistry: GraphRegistry): void {
		throw new Error('Method not implemented.');
	}
}
