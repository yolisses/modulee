import { EditorCommand } from '$lib/editor/EditorCommand';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import { getModuleNodeAudioTargetNodeId } from '$lib/module/getModuleNodeAudioTargetNodeId';
import { getIsSomeModuleNodeData } from '$lib/rack/getIsSomeModuleNodeData';
import { getId } from '$lib/ui/getId';
import { RemoveConnectionsCommand } from '../connection/RemoveConnectionsCommand';
import { mockCommandData } from '../test/mockNodeData';
import { ReplaceConnectionsTargetNodeIdCommand } from './ReplaceConnectionsTargetNodeIdCommand';

/**
 * Move an effect in the effect chain:
 *
 * 1. Replace audio input connections targets from the module node to its target
 *    node (if any).
 * 2. Replace
 */
export class ReorderEffectCommand extends EditorCommand<{
	moduleNodeId: string;
	referenceNodeId: string;
	direction: 'back' | 'front';
}> {
	removeConnectionsToNode?: RemoveConnectionsCommand;
	replaceConnectionsToNode?: ReplaceConnectionsTargetNodeIdCommand;

	execute(graphRegistry: GraphRegistry): void {
		const { moduleNodeId } = this.details;

		const nodeData = graphRegistry.nodes.get(moduleNodeId);
		if (!getIsSomeModuleNodeData(nodeData)) {
			throw new Error('Invalid node type', { cause: nodeData });
		}

		const connectionToNodeIds = graphRegistry.connections
			.values()
			.filter((connectionData) => {
				return connectionData.targetNodeId === moduleNodeId;
			})
			.map(getId);
		const moduleNodeAudioTargetNodeId = getModuleNodeAudioTargetNodeId(moduleNodeId, graphRegistry);
		if (moduleNodeAudioTargetNodeId) {
			this.replaceConnectionsToNode = new ReplaceConnectionsTargetNodeIdCommand(
				mockCommandData({
					connectionIds: connectionToNodeIds,
					targetId: moduleNodeAudioTargetNodeId,
				}),
			);
			this.replaceConnectionsToNode.execute(graphRegistry);
		} else {
			this.removeConnectionsToNode = new RemoveConnectionsCommand(
				mockCommandData({ connectionIds: connectionToNodeIds }),
			);
			this.removeConnectionsToNode.execute(graphRegistry);
		}
	}

	undo(graphRegistry: GraphRegistry): void {
		this.removeConnectionsToNode?.undo(graphRegistry);
		this.replaceConnectionsToNode?.undo(graphRegistry);
	}
}
