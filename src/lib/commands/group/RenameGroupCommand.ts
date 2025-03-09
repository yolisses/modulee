import type { GraphRegistry } from '$lib/data/GraphRegistry';
import { EditorCommand } from '$lib/editor/EditorCommand';

export class RenameGroupCommand extends EditorCommand<{
	groupId: string;
	name: string;
}> {
	previousName!: string;

	execute(graphRegistry: GraphRegistry): void {
		const groupData = graphRegistry.groups.get(this.details.groupId);
		this.previousName = groupData.name;
		groupData.name = this.details.name;
	}

	undo(graphRegistry: GraphRegistry): void {
		const groupData = graphRegistry.groups.get(this.details.groupId);
		groupData.name = this.previousName;
	}
}
