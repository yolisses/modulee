import { PasteNodesCommand } from '$lib/commands/node/PasteNodesCommand';
import { createId } from '$lib/data/createId';
import type { NodeData } from '$lib/data/NodeData';
import { ActionCommand } from '$lib/shortcut/ActionCommand';
import type { Contexts } from '$lib/shortcut/Contexts.svelte';

export class PasteNodesActionCommand extends ActionCommand {
	nodesData!: NodeData[];

	execute(contexts: Contexts): void {
		const { editor } = contexts.editorContext;
		const { copyData: originalCopyData } = contexts.copyDataContext;
		const { projectData } = contexts.projectDataContext;

		if (!originalCopyData) return;

		const idMap = new Map<string, string>();
		console.log(originalCopyData);
		const copyData = structuredClone(originalCopyData);
		const { nodes, connections } = copyData;

		nodes.forEach((node) => {
			const newId = createId();
			idMap.set(node.id, newId);
			node.id = newId;
		});

		connections.forEach((connection) => {
			connection.id = createId();

			const newTargetNodeId = idMap.get(connection.targetNodeId);
			if (!newTargetNodeId) throw new Error(`Can't find new id to replace ${newTargetNodeId}`);
			connection.targetNodeId = newTargetNodeId;

			const newInputPathNodeId = idMap.get(connection.inputPath.nodeId);
			if (!newInputPathNodeId)
				throw new Error(`Can't find new id to replace ${newInputPathNodeId}`);
			connection.inputPath.nodeId = newInputPathNodeId;
		});

		const undoCommand = new PasteNodesCommand({
			id: createId(),
			type: 'PasteNodesCommand',
			projectId: projectData.id,
			createdAt: new Date().toJSON(),
			details: { nodes, connections },
		});

		editor.execute(undoCommand);
	}
}
