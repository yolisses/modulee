import { createEditorCommand } from '$lib/commands/createEditorCommand';
import { UndoCommand } from '$lib/commands/editor/UndoCommand';
import { createId } from '$lib/data/createId';
import type { NodeData } from '$lib/data/NodeData';
import { ActionCommand } from '$lib/shortcut/ActionCommand';
import type { Contexts } from '$lib/shortcut/contexts';

export class UndoActionCommand extends ActionCommand {
	nodesData!: NodeData[];

	execute(contexts: Contexts): void {
		const { editor } = contexts.editorContext;
		const { projectData } = contexts.projectDataContext;

		const lastCommand = editor.history.at(-1);
		if (!lastCommand) return;

		const undoCommand = new UndoCommand({
			id: createId(),
			type: 'UndoCommand',
			projectId: projectData.id,
			createdAt: new Date().toJSON(),
			details: { commandId: lastCommand.id },
		});
		undoCommand.createCommandCallback = createEditorCommand;

		editor.execute(undoCommand);
	}
}
