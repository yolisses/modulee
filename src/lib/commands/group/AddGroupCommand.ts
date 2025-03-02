import type { GraphData } from '$lib/data/GraphData';
import type { GroupData } from '$lib/data/GroupData';
import { EditorCommand } from '$lib/editor/EditorCommand';

export class AddGroupCommand extends EditorCommand<{
	group: GroupData;
}> {
	static name = 'AddGroupCommand';

	execute(graphData: GraphData): void {
		const { group } = this.details;
		graphData.groups.add(group);
	}

	undo(graphData: GraphData): void {
		graphData.groups.remove(this.details.group);
	}
}
