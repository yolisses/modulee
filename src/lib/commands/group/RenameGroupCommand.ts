import type { GraphData } from '$lib/data/GraphData';
import { Command } from '$lib/editor/Command';

export class RenameGroupCommand extends Command<{
	groupId: string;
	name: string;
}> {
	previousName!: string;

	execute(graphData: GraphData): void {
		const groupData = graphData.groups.get(this.details.groupId);
		this.previousName = groupData.name;
		groupData.name = this.details.name;
	}

	undo(graphData: GraphData): void {
		const groupData = graphData.groups.get(this.details.groupId);
		groupData.name = this.previousName;
	}
}
