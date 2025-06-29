import { EditorCommand } from '$lib/editor/EditorCommand';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';

export class RenameInternalModuleCommand extends EditorCommand<{
	internalModuleId: string;
	name: string;
}> {
	previousName!: string;

	execute(graphRegistry: GraphRegistry): void {
		const internalModuleData = graphRegistry.internalModules.get(this.details.internalModuleId);
		this.previousName = internalModuleData.name;
		internalModuleData.name = this.details.name;
	}

	undo(graphRegistry: GraphRegistry): void {
		const internalModuleData = graphRegistry.internalModules.get(this.details.internalModuleId);
		internalModuleData.name = this.previousName;
	}
}
