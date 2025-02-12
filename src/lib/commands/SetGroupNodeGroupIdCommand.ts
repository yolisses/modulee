import { Command } from '$lib/editor/Command';
import type { EditorData } from '$lib/editor/EditorData';

export class SetGroupNodeGroupIdCommand extends Command<{
	nodeId: string;
	groupId: string;
}> {
	previousGroupId!: number;

	execute(editorData: EditorData): void {
		const { groupId, nodeId } = this.details;
		const node = editorData.nodes.get(nodeId);
		if (node.type !== 'GroupNode') {
			throw new Error("Can't change the groupId of a node with type different than GroupNode");
		}
		this.previousGroupId = node.extras.groupId as number;
		node.extras.groupId = groupId;
	}

	undo(editorData: EditorData): void {
		const { nodeId } = this.details;
		const node = editorData.nodes.get(nodeId);
		if (node.type !== 'GroupNode') {
			throw new Error("Can't change the groupId of a node with type different than GroupNode");
		}
		node.extras.groupId = this.previousGroupId;
	}
}
