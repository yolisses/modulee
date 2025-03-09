import type { GraphRegistry } from '$lib/data/GraphRegistry';
import type { GroupData } from '$lib/data/GroupData';
import { EditorCommand } from '$lib/editor/EditorCommand';

export class RemoveGroupCommand extends EditorCommand<{
	groupId: string;
}> {
	static name = 'RemoveGroupCommand';

	groupData!: GroupData;

	execute(graphData: GraphRegistry): void {
		this.groupData = graphData.groups.removeById(this.details.groupId);
	}

	undo(graphData: GraphRegistry): void {
		graphData.groups.add(this.groupData);
	}
}
