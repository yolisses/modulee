import type { GraphRegistry } from '$lib/data/GraphRegistry';
import type { ModuleReference } from '$lib/data/ModuleReference';
import { EditorCommand } from '$lib/editor/EditorCommand';

export class SetModuleNodeModuleReferenceCommand extends EditorCommand<{
	moduleNodeId: string;
	moduleReference: ModuleReference;
}> {
	static name = 'SetModuleNodeModuleReferenceCommand';

	previousModuleReference?: ModuleReference;

	getNode(graphRegistry: GraphRegistry, moduleNodeId: string) {
		const node = graphRegistry.nodes.get(moduleNodeId);
		if (node.type !== 'ModuleNode' && node.type !== 'ModuleVoicesNode') {
			throw new Error("Can't change the internalModuleId of a non internalModule node");
		}
		return node;
	}

	execute(graphRegistry: GraphRegistry): void {
		const { moduleReference, moduleNodeId } = this.details;
		const node = this.getNode(graphRegistry, moduleNodeId);
		this.previousModuleReference = node.extras.moduleReference;
		node.extras.moduleReference = moduleReference;
	}

	undo(graphRegistry: GraphRegistry): void {
		const { moduleNodeId } = this.details;
		const node = this.getNode(graphRegistry, moduleNodeId);
		node.extras.moduleReference = this.previousModuleReference;
	}
}
