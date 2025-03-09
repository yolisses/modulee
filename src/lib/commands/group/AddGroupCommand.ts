import type { GraphRegistry } from '$lib/data/GraphRegistry';
import type { GroupData } from '$lib/data/GroupData';
import { EditorCommand } from '$lib/editor/EditorCommand';

export class AddGroupCommand extends EditorCommand<{
	group: GroupData;
}> {
	static name = 'AddGroupCommand';

	execute(graphRegistry: GraphRegistry): void {
		const { group } = this.details;
		graphRegistry.groups.add(group);
	}

	undo(graphRegistry: GraphRegistry): void {
		graphRegistry.groups.remove(this.details.group);
	}
}
