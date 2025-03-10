import type { GraphRegistry } from '$lib/data/GraphRegistry';
import { EditorCommand } from '$lib/editor/EditorCommand';

export class SetInternalModuleNodeTargetInternalModuleIdCommand extends EditorCommand<{
	targetInternalModuleId: string;
	internalModuleNodeId: string;
}> {
	static name = 'SetInternalModuleNodeTargetInternalModuleIdCommand';

	previousTargetInternalModuleId!: string;

	execute(graphRegistry: GraphRegistry): void {
		const { targetInternalModuleId, internalModuleNodeId } = this.details;
		const node = graphRegistry.nodes.get(internalModuleNodeId);
		if (node.type !== 'InternalModuleNode' && node.type !== 'InternalModuleVoicesNode') {
			throw new Error("Can't change the internalModuleId of a non internalModule node");
		}
		this.previousTargetInternalModuleId = node.extras.targetInternalModuleId;
		node.extras.targetInternalModuleId = targetInternalModuleId;
	}

	undo(graphRegistry: GraphRegistry): void {
		const { internalModuleNodeId } = this.details;
		const node = graphRegistry.nodes.get(internalModuleNodeId);
		if (node.type !== 'InternalModuleNode' && node.type !== 'InternalModuleVoicesNode') {
			throw new Error("Can't change the internalModuleId of a non internalModule node");
		}
		node.extras.targetInternalModuleId = this.previousTargetInternalModuleId;
	}
}
