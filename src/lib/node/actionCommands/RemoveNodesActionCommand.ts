import { RemoveNodesCommand } from '$lib/commands/node/RemoveNodesCommand';
import { editorContextKey } from '$lib/editor/editorContext';
import { createId } from '$lib/global/createId';
import type { NodeData } from '$lib/node/data/NodeData';
import { projectDataContextKey } from '$lib/project/ui/projectDataContext';
import { ActionCommand } from '$lib/shortcut/ActionCommand';
import type { Contexts } from '$lib/shortcut/Contexts.svelte';
import { selectedNodeIdsContextKey } from 'nodes-editor';

export class RemoveNodesActionCommand extends ActionCommand {
	nodesData!: NodeData[];

	execute(contexts: Contexts): void {
		const { editor } = contexts.get(editorContextKey);
		const { projectData } = contexts.get(projectDataContextKey);
		const { selectedNodeIds } = contexts.get(selectedNodeIdsContextKey);

		const nodeIds = [...selectedNodeIds];

		const command = new RemoveNodesCommand({
			id: createId(),
			details: { nodeIds },
			projectId: projectData.id,
			type: 'RemoveNodesCommand',
			createdAt: new Date().toJSON(),
		});
		editor.execute(command);
	}
}
