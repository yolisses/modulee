import type { GraphRegistry } from '$lib/data/GraphRegistry';
import type { InternalModuleData } from '$lib/data/InternalModuleData';
import { EditorCommand } from '$lib/editor/EditorCommand';

export class AddInternalModuleCommand extends EditorCommand<{
	internalModule: InternalModuleData;
}> {
	static name = 'AddInternalModuleCommand';

	execute(graphRegistry: GraphRegistry): void {
		const { internalModule } = this.details;
		graphRegistry.internalModules.add(internalModule);
	}

	undo(graphRegistry: GraphRegistry): void {
		graphRegistry.internalModules.remove(this.details.internalModule);
	}
}
