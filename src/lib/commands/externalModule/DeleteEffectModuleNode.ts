import type { GraphRegistry } from '$lib/data/GraphRegistry';
import { EditorCommand } from '$lib/editor/EditorCommand';
import { getIsAudioInputNodeData } from '$lib/module/externalModule/effect/getIsAudioInputNodeData';
import { getIsSomeModuleNodeData } from '$lib/rack/getIsSomeModuleNodeData';
import { getId } from '$lib/ui/getId';
import { RemoveNodeCommand } from '../node/RemoveNodeCommand';
import { mockCommandData } from '../test/mockNodeData';
import { ReplaceConnectionsTargetNodeIdCommand } from './ReplaceConnectionsTargetNodeIdCommand';

/**
 * Deletes an effect module node following these steps:
 *
 * 1. Set connections to the module node to its audio input (if any)
 * 2. Delete the effect module node
 */
export class DeleteEffectModuleNode extends EditorCommand<{ moduleNodeId: string }> {
	removeNodeCommand!: RemoveNodeCommand;
	replaceConnectionsTargetNodeIdCommand?: ReplaceConnectionsTargetNodeIdCommand;

	execute(graphRegistry: GraphRegistry): void {
		const { moduleNodeId } = this.details;

		// 1. Set connections to the module node to its audio input (if any)
		const moduleNode = graphRegistry.nodes.get(moduleNodeId);
		if (!getIsSomeModuleNodeData(moduleNode)) {
			throw new Error('Invalid type for module node');
		}
		const { moduleReference } = moduleNode.extras;
		if (moduleReference?.type == 'external') {
			const externalModule = graphRegistry.externalModules.get(moduleReference.id);
			const audioInputIds = new Set(
				externalModule.graph.nodes.filter(getIsAudioInputNodeData).map(getId),
			);
			const audioInputConnection = graphRegistry.connections.values().find((connectionData) => {
				const { nodeId, inputKey } = connectionData.inputPath;
				return nodeId === moduleNodeId && audioInputIds.has(inputKey);
			});
			if (audioInputConnection) {
				this.replaceConnectionsTargetNodeIdCommand = new ReplaceConnectionsTargetNodeIdCommand(
					mockCommandData({
						previousTargetId: moduleNodeId,
						newTargetId: audioInputConnection.targetNodeId,
					}),
				);
			}
		}

		// 2. Delete the effect module node
		this.removeNodeCommand = new RemoveNodeCommand(mockCommandData({ nodeId: moduleNodeId }));
	}

	undo(graphRegistry: GraphRegistry): void {
		this.removeNodeCommand.undo(graphRegistry);
		this.replaceConnectionsTargetNodeIdCommand?.undo();
	}
}
