import type { GraphData } from '$lib/data/GraphData';
import type { GroupData } from '$lib/data/GroupData';
import type { NodeData } from '$lib/data/NodeData';
import { Command } from '$lib/editor/Command';

export class GroupNodesCommand extends Command<{
	group: GroupData;
	nodesId: string[];
	groupNodeData: NodeData;
}> {
	previousGroupIds!: Record<string, string>;

	execute(graphData: GraphData): void {
		const { group, nodesId, groupNodeData } = this.details;

		graphData.groups.set(group);

		this.previousGroupIds = {};
		graphData.nodes.values().forEach((nodeData) => {
			if (nodesId.includes(nodeData.id)) {
				this.previousGroupIds[nodeData.id] = nodeData.groupId;
				nodeData.groupId = group.id;
			}
		});

		graphData.nodes.set(groupNodeData);
	}

	undo(graphData: GraphData): void {
		graphData.groups.remove(this.details.group);
		graphData.nodes.remove(this.details.groupNodeData);
		graphData.nodes.values().forEach((nodeData) => {
			const previousGroupId = this.previousGroupIds[nodeData.id];
			if (previousGroupId) {
				nodeData.groupId = previousGroupId;
			}
		});
	}
}
