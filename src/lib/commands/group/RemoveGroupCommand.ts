import type { GraphRegistry } from '$lib/data/GraphRegistry';
import type { GroupData } from '$lib/data/GroupData';
import { EditorCommand } from '$lib/editor/EditorCommand';

export class RemoveGroupCommand extends EditorCommand<{
	groupId: string;
}> {
	static name = 'RemoveGroupCommand';

	groupData!: GroupData;

	execute(graphRegistry: GraphRegistry): void {
		this.groupData = graphRegistry.groups.removeById(this.details.groupId);
	}

	undo(graphRegistry: GraphRegistry): void {
		graphRegistry.groups.add(this.groupData);
	}
}
