import { createEditorCommand } from '$lib/commands/createEditorCommand';
import { UndoCommand } from '$lib/commands/editor/UndoCommand';
import { editorContextKey } from '$lib/editor/editorContext';
import { createId } from '$lib/global/createId';
import type { NodeData } from '$lib/node/data/NodeData';
import { projectDataContextKey } from '$lib/project/ui/projectDataContext';
import { ActionCommand } from '$lib/shortcut/ActionCommand';
import type { Contexts } from '$lib/shortcut/Contexts.svelte';

export class UndoActionCommand extends ActionCommand {
	nodesData!: NodeData[];

	execute(contexts: Contexts): void {
		const { editor } = contexts.get(editorContextKey);
		const { projectData } = contexts.get(projectDataContextKey);

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
