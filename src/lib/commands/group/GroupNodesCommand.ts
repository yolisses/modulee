import type { GroupData } from '$lib/data/GroupData';
import type { NodeData } from '$lib/data/NodeData';
import { Command } from '$lib/editor/Command';
import type { EditorData } from '$lib/editor/EditorData';

export class GroupNodesCommand extends Command<{
	group: GroupData;
	nodesId: string[];
	groupNodeData: NodeData;
}> {
	previousGroupIds!: Record<string, string>;

	execute(editorData: EditorData): void {
		const { group, nodesId, groupNodeData } = this.details;

		editorData.groups.set(group);

		this.previousGroupIds = {};
		editorData.nodes.values().forEach((nodeData) => {
			if (nodesId.includes(nodeData.id)) {
				this.previousGroupIds[nodeData.id] = nodeData.groupId;
				nodeData.groupId = group.id;
			}
		});

		editorData.nodes.set(groupNodeData);
	}

	undo(editorData: EditorData): void {
		editorData.groups.remove(this.details.group);
		editorData.nodes.remove(this.details.groupNodeData);
		editorData.nodes.values().forEach((nodeData) => {
			const previousGroupId = this.previousGroupIds[nodeData.id];
			if (previousGroupId) {
				nodeData.groupId = previousGroupId;
			}
		});
	}
}
