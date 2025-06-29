import { EditorCommand } from '$lib/editor/EditorCommand';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import type { InternalModuleData } from '$lib/module/internalModule/InternalModuleData';

export class RemoveInternalModuleCommand extends EditorCommand<{
	internalModuleId: string;
}> {
	static name = 'RemoveInternalModuleCommand';

	internalModuleData?: InternalModuleData;

	execute(graphRegistry: GraphRegistry): void {
		this.internalModuleData = graphRegistry.internalModules.removeById(
			this.details.internalModuleId,
		);
	}

	undo(graphRegistry: GraphRegistry): void {
		if (this.internalModuleData) {
			graphRegistry.internalModules.add(this.internalModuleData);
		}
	}
}
