import type { GraphData } from '$lib/data/GraphData';
import type { GroupData } from '$lib/data/GroupData';
import type { NodeData } from '$lib/data/NodeData';
import { Command } from '$lib/editor/Command';
import { mockCommandData } from '../test/mockNodeData';
import { AddGroupCommand } from './AddGroupCommand';

export class GroupNodesCommand extends Command<{
	group: GroupData;
	nodesId: string[];
	groupNodeData: NodeData;
}> {
	addGroupCommand!: AddGroupCommand;
	previousGroupIds!: Record<string, string>;

	execute(graphData: GraphData): void {
		const { group, nodesId, groupNodeData } = this.details;

		// TODO find better way to instantiate this command
		this.addGroupCommand = new AddGroupCommand(mockCommandData({ group }));
		this.addGroupCommand.execute(graphData);

		this.previousGroupIds = {};
		graphData.nodes.values().forEach((nodeData) => {
			if (nodesId.includes(nodeData.id)) {
				this.previousGroupIds[nodeData.id] = nodeData.groupId;
				nodeData.groupId = group.id;
			}
		});

		graphData.nodes.add(groupNodeData);
	}

	undo(graphData: GraphData): void {
		this.addGroupCommand.undo(graphData);
		graphData.nodes.remove(this.details.groupNodeData);
		graphData.nodes.values().forEach((nodeData) => {
			const previousGroupId = this.previousGroupIds[nodeData.id];
			if (previousGroupId) {
				nodeData.groupId = previousGroupId;
			}
		});
	}
}
