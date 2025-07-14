import { FormatNodesCommand } from '$lib/commands/node/FormatNodesCommand';
import { editorContextKey } from '$lib/editor/editorContext';
import { createId } from '$lib/global/createId';
import { projectDataContextKey } from '$lib/project/ui/projectDataContext';
import { ActionCommand } from '$lib/shortcut/ActionCommand';
import type { Contexts } from '$lib/shortcut/Contexts.svelte';
import type { NodeData } from '../data/NodeData';

export class FormatNodesActionCommand extends ActionCommand {
	nodesData!: NodeData[];

	execute(contexts: Contexts): void {
		const { editor } = contexts.get(editorContextKey);
		const { projectData } = contexts.get(projectDataContextKey);

		const newInternalModuleId = createId();
		const command = new FormatNodesCommand({
			createdAt: new Date().toJSON(),
			details: {},
			id: newInternalModuleId,
			projectId: projectData.id,
			type: 'FormatNodesCommand',
		});

		editor.execute(command);
	}
}
