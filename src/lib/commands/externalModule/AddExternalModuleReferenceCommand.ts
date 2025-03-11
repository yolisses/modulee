import type { ExternalModuleReference } from '$lib/data/ExternalModuleReference';
import type { GraphRegistry } from '$lib/data/GraphRegistry';
import { EditorCommand } from '$lib/editor/EditorCommand';

export class AddExternalModuleReferenceCommand extends EditorCommand<{
	externalModuleReference: ExternalModuleReference;
}> {
	static name = 'AddExternalModuleReferenceCommand';

	execute(graphRegistry: GraphRegistry): void {
		const { externalModuleReference } = this.details;
		graphRegistry.externalModuleReferences.add(externalModuleReference);
	}

	undo(graphRegistry: GraphRegistry): void {
		graphRegistry.externalModuleReferences.remove(this.details.externalModuleReference);
	}
}
