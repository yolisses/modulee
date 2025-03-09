import type { Remotion } from '$lib/array/remotion';
import { removeById } from '$lib/array/removeById';
import type { GraphRegistry } from '$lib/data/GraphRegistry';
import { EditorCommand } from '$lib/editor/EditorCommand';
import type { EditorData } from '$lib/editor/EditorData';

export class UndoCommand extends EditorCommand<{
	commandId: string;
}> {
	static getName() {
		return 'test1';
	}
	static name = 'UndoCommand';

	remotion!: Remotion<EditorCommand>;

	execute(graphRegistry: GraphRegistry, editorData: EditorData): void {
		this.remotion = removeById(editorData.history, this.details.commandId);
		const command = this.remotion.item;
		editorData.undoneHistory.push(command);
		command.undo(graphRegistry, editorData);
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	undo(graphRegistry: GraphRegistry, editorData: EditorData): void {
		throw new Error('Method not implemented');
	}
}
