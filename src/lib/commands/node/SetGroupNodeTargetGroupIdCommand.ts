import { Command } from '$lib/editor/Command';
import type { EditorData } from '$lib/editor/EditorData';

export class SetGroupNodeTargetGroupIdCommand extends Command<{
	targetGroupId: string;
	groupNodeId: string;
}> {
	previousTargetGroupId!: string;

	execute(editorData: EditorData): void {
		const { targetGroupId, groupNodeId } = this.details;
		const node = editorData.nodes.get(groupNodeId);
		if (node.type !== 'GroupNode') {
			throw new Error("Can't change the groupId of a non group node");
		}
		this.previousTargetGroupId = node.extras.targetGroupId;
		node.extras.targetGroupId = targetGroupId;
	}

	undo(editorData: EditorData): void {
		const { groupNodeId } = this.details;
		const node = editorData.nodes.get(groupNodeId);
		if (node.type !== 'GroupNode') {
			throw new Error("Can't change the groupId of a non group node");
		}
		node.extras.targetGroupId = this.previousTargetGroupId;
	}
}
