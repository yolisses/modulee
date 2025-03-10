import type { GraphRegistry } from '$lib/data/GraphRegistry';
import { EditorCommand } from '$lib/editor/EditorCommand';

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
