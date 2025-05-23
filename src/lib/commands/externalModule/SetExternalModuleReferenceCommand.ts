import type { ExternalModuleReference } from '$lib/data/ExternalModuleReference';
import type { GraphRegistry } from '$lib/data/GraphRegistry';
import { EditorCommand } from '$lib/editor/EditorCommand';

export class SetExternalModuleReferenceCommand extends EditorCommand<{
	externalModuleReference: ExternalModuleReference;
}> {
	static name = 'SetExternalModuleReferenceCommand';

	previous?: ExternalModuleReference;

	execute(graphRegistry: GraphRegistry): void {
		const { externalModuleReference } = this.details;
		this.previous = graphRegistry.externalModuleReferences.removeById(externalModuleReference.id);
		graphRegistry.externalModuleReferences.add(externalModuleReference);
	}

	undo(graphRegistry: GraphRegistry): void {
		graphRegistry.externalModuleReferences.remove(this.details.externalModuleReference);
		if (this.previous) {
			graphRegistry.externalModuleReferences.add(this.previous);
		}
	}
}
