import { RemoveNodeCommand } from '$lib/commands/node/RemoveNodeCommand';
import { createId } from '$lib/data/createId';
import type { NodeData } from '$lib/data/NodeData';
import { Command } from '$lib/shortcut/Command';
import type { Contexts } from '$lib/shortcut/contexts';

export class RemoveNodesCommandV2 extends Command {
	nodesData!: NodeData[];

	execute(contexts: Contexts): void {
		const { editor } = contexts.editorContext;
		const { projectData } = contexts.projectDataContext;
		const { selectedNodeIds } = contexts.selectedNodeIdsContext;

		const nodeId = [...selectedNodeIds][0];

		const command = new RemoveNodeCommand({
			id: createId(),
			details: { nodeId },
			projectId: projectData.id,
			type: 'RemoveNodeCommand',
			createdAt: new Date().toJSON(),
		});
		editor.execute(command);
	}
}
