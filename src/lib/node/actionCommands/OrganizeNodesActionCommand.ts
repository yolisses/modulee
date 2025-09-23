import { OrganizeNodesCommand } from '$lib/commands/node/move/OrganizeNodesCommand';
import { editorContextKey } from '$lib/editor/editorContext';
import { createId } from '$lib/global/createId';
import { projectDataContextKey } from '$lib/project/ui/projectDataContext';
import { ActionCommand } from '$lib/shortcut/ActionCommand';
import type { Contexts } from '$lib/shortcut/Contexts.svelte';
import type { NodeData } from '../data/NodeData';

export class OrganizeNodesActionCommand extends ActionCommand {
	nodesData!: NodeData[];

	execute(contexts: Contexts): void {
		const { editor } = contexts.get(editorContextKey);
		const { projectData } = contexts.get(projectDataContextKey);

		const newInternalModuleId = createId();
		const command = new OrganizeNodesCommand({
			createdAt: new Date().toJSON(),
			details: {},
			id: newInternalModuleId,
			projectId: projectData.id,
			type: 'OrganizeNodesCommand',
		});

		editor.execute(command);
	}
}
