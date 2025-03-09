import type { GraphRegistry } from '$lib/data/GraphRegistry';
import { EditorCommand } from '$lib/editor/EditorCommand';

export class SetGroupNodeTargetGroupIdCommand extends EditorCommand<{
	targetGroupId: string;
	groupNodeId: string;
}> {
	static name = 'SetGroupNodeTargetGroupIdCommand';

	previousTargetGroupId!: string;

	execute(graphData: GraphRegistry): void {
		const { targetGroupId, groupNodeId } = this.details;
		const node = graphData.nodes.get(groupNodeId);
		if (node.type !== 'GroupNode' && node.type !== 'GroupVoicesNode') {
			throw new Error("Can't change the groupId of a non group node");
		}
		this.previousTargetGroupId = node.extras.targetGroupId;
		node.extras.targetGroupId = targetGroupId;
	}

	undo(graphData: GraphRegistry): void {
		const { groupNodeId } = this.details;
		const node = graphData.nodes.get(groupNodeId);
		if (node.type !== 'GroupNode' && node.type !== 'GroupVoicesNode') {
			throw new Error("Can't change the groupId of a non group node");
		}
		node.extras.targetGroupId = this.previousTargetGroupId;
	}
}
