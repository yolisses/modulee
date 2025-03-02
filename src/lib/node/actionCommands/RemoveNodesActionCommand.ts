import { RemoveNodesCommand } from '$lib/commands/node/RemoveNodesCommand';
import { createId } from '$lib/data/createId';
import type { NodeData } from '$lib/data/NodeData';
import { ActionCommand } from '$lib/shortcut/ActionCommand';
import type { Contexts } from '$lib/shortcut/contexts';

export class RemoveNodesActionCommand extends ActionCommand {
	nodesData!: NodeData[];

	execute(contexts: Contexts): void {
		const { editor } = contexts.editorContext;
		const { projectData } = contexts.projectDataContext;
		const { selectedNodeIds } = contexts.selectedNodeIdsContext;

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
