import type { ExternalModuleReference } from '$lib/data/ExternalModuleReference';
import type { GraphRegistry } from '$lib/data/GraphRegistry';
import { EditorCommand } from '$lib/editor/EditorCommand';

export class RemoveExternalModuleReferenceCommand extends EditorCommand<{
	externalModuleReferenceId: string;
}> {
	static name = 'RemoveExternalModuleReferenceCommand';

	removed?: ExternalModuleReference;

	execute(graphRegistry: GraphRegistry): void {
		const { externalModuleReferenceId } = this.details;
		this.removed = graphRegistry.externalModuleReferences.removeById(externalModuleReferenceId);
	}

	undo(graphRegistry: GraphRegistry): void {
		if (this.removed) {
			graphRegistry.externalModuleReferences.add(this.removed);
		}
	}
}
