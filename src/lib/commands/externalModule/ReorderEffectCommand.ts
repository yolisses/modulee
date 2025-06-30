import { EditorCommand } from '$lib/editor/EditorCommand';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import { AUDIO_INPUT_KEY } from '$lib/input/AUDIO_INPUT_KEY';
import { getAreInputPathsEqual } from '$lib/input/getAreInputPathsEqual';
import { getModuleNodeAudioTargetNodeId } from '$lib/module/getModuleNodeAudioTargetNodeId';

export class ReorderEffectCommand extends EditorCommand<{
	moduleNodeId: string;
	referenceNodeId: string;
	newConnectionId?: string;
	direction: 'before' | 'after';
}> {
	execute(graphRegistry: GraphRegistry): void {
		const { moduleNodeId, direction, referenceNodeId, newConnectionId } = this.details;

		const audioConnections = graphRegistry.connections.values().filter((connectionData) => {
			return (
				connectionData.inputPath.inputKey === AUDIO_INPUT_KEY &&
				graphRegistry.nodes.getOrNull(connectionData.targetNodeId)?.type === 'ModuleNode' &&
				graphRegistry.nodes.getOrNull(connectionData.inputPath.nodeId)?.type === 'ModuleNode'
			);
		});

		const moduleNodeOldAudioTargetNodeId = getModuleNodeAudioTargetNodeId(
			moduleNodeId,
			graphRegistry,
		);
		const moduleNodeNewAudioTargetNodeId =
			direction === 'after'
				? referenceNodeId
				: getModuleNodeAudioTargetNodeId(referenceNodeId, graphRegistry);

		audioConnections.forEach((audioConnection) => {
			const isToModuleNode = audioConnection.targetNodeId === moduleNodeId;
			if (isToModuleNode) {
				if (moduleNodeOldAudioTargetNodeId) {
					audioConnection.targetNodeId = moduleNodeOldAudioTargetNodeId;
				} else {
					graphRegistry.connections.remove(audioConnection);
				}
			}

			const isFromModuleNode = getAreInputPathsEqual(audioConnection.inputPath, {
				nodeId: moduleNodeId,
				inputKey: 'audio',
			});
			if (isFromModuleNode) {
				if (moduleNodeNewAudioTargetNodeId) {
					audioConnection.targetNodeId = moduleNodeNewAudioTargetNodeId;
				} else {
					graphRegistry.connections.remove(audioConnection);
				}
			}

			if (moduleNodeNewAudioTargetNodeId) {
				const isToNewAudioTarget = audioConnection.targetNodeId === moduleNodeNewAudioTargetNodeId;
				if (isToNewAudioTarget) {
					audioConnection.targetNodeId = moduleNodeId;
				}
			}
		});
		if (!moduleNodeNewAudioTargetNodeId) {
			if (!newConnectionId) {
				throw new Error('Missing required new connection id');
			}
			graphRegistry.connections.add({
				id: newConnectionId,
				targetNodeId: moduleNodeId,
				inputPath: { inputKey: AUDIO_INPUT_KEY, nodeId: referenceNodeId },
			});
		}
	}

	undo(graphRegistry: GraphRegistry): void {}
}
