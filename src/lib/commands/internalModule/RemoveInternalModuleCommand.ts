import type { GraphRegistry } from '$lib/data/GraphRegistry';
import type { InternalModuleData } from '$lib/data/InternalModuleData';
import { EditorCommand } from '$lib/editor/EditorCommand';

export class RemoveInternalModuleCommand extends EditorCommand<{
	internalModuleId: string;
}> {
	static name = 'RemoveInternalModuleCommand';

	internalModuleData!: InternalModuleData;

	execute(graphRegistry: GraphRegistry): void {
		this.internalModuleData = graphRegistry.internalModules.removeById(
			this.details.internalModuleId,
		);
	}

	undo(graphRegistry: GraphRegistry): void {
		graphRegistry.internalModules.add(this.internalModuleData);
	}
}
