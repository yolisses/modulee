import type { GraphRegistry } from '$lib/data/GraphRegistry';
import type { GroupData } from '$lib/data/GroupData';
import { EditorCommand } from '$lib/editor/EditorCommand';

export class AddGroupCommand extends EditorCommand<{
	group: GroupData;
}> {
	static name = 'AddGroupCommand';

	execute(graphData: GraphRegistry): void {
		const { group } = this.details;
		graphData.groups.add(group);
	}

	undo(graphData: GraphRegistry): void {
		graphData.groups.remove(this.details.group);
	}
}
