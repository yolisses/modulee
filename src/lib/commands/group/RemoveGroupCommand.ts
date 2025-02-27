import type { GraphData } from '$lib/data/GraphData';
import type { GroupData } from '$lib/data/GroupData';
import { Command } from '$lib/editor/Command';

export class RemoveGroupCommand extends Command<{
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
