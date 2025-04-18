import { PasteNodesCommand } from '$lib/commands/node/PasteNodesCommand';
import { createId } from '$lib/data/createId';
import type { NodeData } from '$lib/data/NodeData';
import { ActionCommand } from '$lib/shortcut/ActionCommand';
import type { Contexts } from '$lib/shortcut/Contexts.svelte';
import { Vector } from 'nodes-editor';
import { SvelteSet } from 'svelte/reactivity';

export class PasteNodesActionCommand extends ActionCommand {
	nodesData!: NodeData[];

	execute(contexts: Contexts): void {
		const { copyDataContext } = contexts;
		const { editor } = contexts.editorContext;
		const { projectData } = contexts.projectDataContext;
		const { internalModuleId } = contexts.internalModuleIdContext;

		if (!copyDataContext.copyData) return;

		const copyData = structuredClone(copyDataContext.copyData);
		const { nodes, connections } = copyData;

		const idMap = new Map<string, string>();

		copyDataContext.offset += 4;

		nodes.forEach((node) => {
			const newId = createId();
			idMap.set(node.id, newId);
			node.id = newId;

			node.internalModuleId = internalModuleId;

			node.position = Vector.fromData(node.position).addByNumber(copyDataContext.offset).getData();
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

		contexts.selectedNodeIdsContext.selectedNodeIds = new SvelteSet(
			nodes.map((nodeData) => {
				return nodeData.id;
			}),
		);
	}
}
