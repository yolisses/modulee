import type { GraphRegistry } from '$lib/data/GraphRegistry';
import { EditorCommand } from '$lib/editor/EditorCommand';

export class SetModuleNodeModuleReferenceCommand extends EditorCommand<{
	targetInternalModuleId: string;
	moduleNodeId: string;
}> {
	static name = 'SetModuleNodeModuleReferenceCommand';

	previousTargetInternalModuleId!: string;

	execute(graphRegistry: GraphRegistry): void {
		const { targetInternalModuleId, moduleNodeId } = this.details;
		const node = graphRegistry.nodes.get(moduleNodeId);
		if (node.type !== 'ModuleNode' && node.type !== 'ModuleVoicesNode') {
			throw new Error("Can't change the internalModuleId of a non internalModule node");
		}
		this.previousTargetInternalModuleId = node.extras.moduleReference;
		node.extras.moduleReference = targetInternalModuleId;
	}

	undo(graphRegistry: GraphRegistry): void {
		const { moduleNodeId } = this.details;
		const node = graphRegistry.nodes.get(moduleNodeId);
		if (node.type !== 'ModuleNode' && node.type !== 'ModuleVoicesNode') {
			throw new Error("Can't change the internalModuleId of a non internalModule node");
		}
		node.extras.moduleReference = this.previousTargetInternalModuleId;
	}
}
