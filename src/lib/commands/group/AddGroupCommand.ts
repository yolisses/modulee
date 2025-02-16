import type { GraphData } from '$lib/data/GraphData';
import type { GroupData } from '$lib/data/GroupData';
import { Command } from '$lib/editor/Command';

export class AddGroupCommand extends Command<{
	group: GroupData;
}> {
	execute(graphData: GraphData): void {
		const { group } = this.details;
		graphData.groups.add(group);
	}

	undo(graphData: GraphData): void {
		graphData.groups.remove(this.details.group);
	}
}
