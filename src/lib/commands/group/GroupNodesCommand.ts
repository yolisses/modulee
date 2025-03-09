import type { GraphRegistry } from '$lib/data/GraphRegistry';
import type { GroupData } from '$lib/data/GroupData';
import type { NodeData } from '$lib/data/NodeData';
import { EditorCommand } from '$lib/editor/EditorCommand';
import { mockCommandData } from '../test/mockNodeData';
import { AddGroupCommand } from './AddGroupCommand';

export class GroupNodesCommand extends EditorCommand<{
	group: GroupData;
	nodesId: string[];
	groupNodeData: NodeData;
}> {
	addGroupCommand!: AddGroupCommand;
	previousGroupIds!: Record<string, string>;

	execute(graphRegistry: GraphRegistry): void {
		const { group, nodesId, groupNodeData } = this.details;

		// TODO find better way to instantiate this command
		this.addGroupCommand = new AddGroupCommand(mockCommandData({ group }));
		this.addGroupCommand.execute(graphRegistry);

		this.previousGroupIds = {};
		graphRegistry.nodes.values().forEach((nodeData) => {
			if (nodesId.includes(nodeData.id)) {
				this.previousGroupIds[nodeData.id] = nodeData.groupId;
				nodeData.groupId = group.id;
			}
		});

		graphRegistry.nodes.add(groupNodeData);
	}

	undo(graphRegistry: GraphRegistry): void {
		this.addGroupCommand.undo(graphRegistry);
		graphRegistry.nodes.remove(this.details.groupNodeData);
		graphRegistry.nodes.values().forEach((nodeData) => {
			const previousGroupId = this.previousGroupIds[nodeData.id];
			if (previousGroupId) {
				nodeData.groupId = previousGroupId;
			}
		});
	}
}
