import { createEditorCommand } from '$lib/commands/createEditorCommand';
import { RedoCommand } from '$lib/commands/editor/RedoCommand';
import { editorContextKey } from '$lib/editor/editorContext';
import { createId } from '$lib/global/createId';
import type { NodeData } from '$lib/node/data/NodeData';
import { projectDataContextKey } from '$lib/project/ui/projectDataContext';
import { ActionCommand } from '$lib/shortcut/ActionCommand';
import type { Contexts } from '$lib/shortcut/Contexts.svelte';

export class RedoActionCommand extends ActionCommand {
	nodesData!: NodeData[];

	execute(contexts: Contexts): void {
		const { editor } = contexts.get(editorContextKey);
		const { projectData } = contexts.get(projectDataContextKey);

		const lastCommand = editor.undoneHistory.at(-1);
		if (!lastCommand) return;

		const redoCommand = new RedoCommand({
			id: createId(),
			type: 'RedoCommand',
			createdAt: new Date().toJSON(),
			details: { commandId: lastCommand.id },
			projectId: projectData.id,
		});
		redoCommand.createCommandCallback = createEditorCommand;

		editor.execute(redoCommand);
	}
}
