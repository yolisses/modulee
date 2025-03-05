import { GroupNodesCommand } from '$lib/commands/group/GroupNodesCommand';
import { createId } from '$lib/data/createId';
import type { Node } from '$lib/data/Node.svelte';
import type { NodeData } from '$lib/data/NodeData';
import { ActionCommand } from '$lib/shortcut/ActionCommand';
import type { Contexts } from '$lib/shortcut/Contexts.svelte';
import { Vector } from '../../../../../nodes-editor/dist/space/Vector';

function getAverageNodesPosition(nodes: Node[]) {
	let positionsSum = Vector.zero();
	nodes.forEach((node) => {
		positionsSum = positionsSum.add(node.position);
	});
	return positionsSum.divideByNumber(nodes.length).round();
}

export class GroupNodesActionCommand extends ActionCommand {
	nodesData!: NodeData[];

	execute(contexts: Contexts): void {
		const { graph } = contexts.graphContext;
		const { editor } = contexts.editorContext;
		const { projectData } = contexts.projectDataContext;
		const { selectedNodeIds } = contexts.selectedNodeIdsContext;
		const { groupId: currentGroupId } = contexts.groupIdContext;

		const nodesId = [...selectedNodeIds];
		const nodes = graph.nodes.values().filter((node) => {
			return selectedNodeIds.has(node.id);
		});
		const averagePosition = getAverageNodesPosition(nodes);

		const newGroupId = createId();
		const groupNodesCommand = new GroupNodesCommand({
			id: newGroupId,
			type: 'GroupNodesCommand',
			createdAt: new Date().toJSON(),
			projectId: projectData.id,
			details: {
				nodesId,
				group: {
					id: newGroupId,
					name: 'New group',
				},
				groupNodeData: {
					id: createId(),
					type: 'GroupNode',
					groupId: currentGroupId,
					position: averagePosition.getData(),
					extras: { targetGroupId: newGroupId },
				},
			},
		});

		editor.execute(groupNodesCommand);
	}
}
