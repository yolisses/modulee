import type { GraphData } from '$lib/data/GraphData';
import type { GroupData } from '$lib/data/GroupData';
import { EditorCommand } from '$lib/editor/EditorCommand';

export class RemoveGroupCommand extends EditorCommand<{
	groupId: string;
}> {
	static name = 'RemoveGroupCommand';

	groupData!: GroupData;

	execute(graphData: GraphData): void {
		this.groupData = graphData.groups.removeById(this.details.groupId);
	}

	undo(graphData: GraphData): void {
		graphData.groups.add(this.groupData);
	}
}
