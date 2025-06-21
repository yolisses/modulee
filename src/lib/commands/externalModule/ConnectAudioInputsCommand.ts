import type { GraphRegistry } from '$lib/data/GraphRegistry';
import { EditorCommand } from '$lib/editor/EditorCommand';
import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';
import { getIsSomeModuleNodeData } from '$lib/rack/getIsSomeModuleNodeData';
import { SetConnectionCommand } from '../connection/SetConnectionCommand';
import { mockCommandData } from '../test/mockNodeData';

export class ConnectAudioInputsCommand extends EditorCommand<{
	targetNodeId: string;
	moduleNodeId: string;
	externalModule: ExternalModuleData;
	audioInputConnectionIds: Record<string, string>;
}> {
	static name = 'ConnectAudioInputsCommand';

	setConntectionCommands!: SetConnectionCommand[];

	execute(graphRegistry: GraphRegistry): void {
		const { moduleNodeId, targetNodeId, externalModule, audioInputConnectionIds } = this.details;
		const { nodes, mainInternalModuleId } = externalModule.graph;

		const audioInputNodes = nodes.filter(
			(node) => node.internalModuleId === mainInternalModuleId && node.type === 'AudioInputNode',
		);
		const audioInputIds = audioInputNodes.map((audioInputNode) => audioInputNode.id);

		const nodeData = graphRegistry.nodes.get(moduleNodeId);
		if (!getIsSomeModuleNodeData(nodeData)) {
			throw new Error('Invalid node type');
		}

		// Remove connections previous connections to audio inputs
		this.setConntectionCommands = audioInputIds.map((audioInputId) => {
			const command = new SetConnectionCommand(
				mockCommandData({
					connection: {
						targetNodeId: targetNodeId,
						id: audioInputConnectionIds[audioInputId],
						inputPath: {
							nodeId: nodeData.id,
							inputKey: audioInputId,
						},
					},
				}),
			);
			command.execute(graphRegistry);
			return command;
		});

		audioInputNodes.forEach((audioInputNode) => {
			graphRegistry.connections.add({
				targetNodeId,
				id: audioInputConnectionIds[audioInputNode.id],
				inputPath: {
					nodeId: moduleNodeId,
					inputKey: audioInputNode.id,
				},
			});
		});
	}

	undo(graphRegistry: GraphRegistry): void {
		const { audioInputConnectionIds } = this.details;
		graphRegistry.connections.removeByCondition((connection) => {
			return !!audioInputConnectionIds[connection.id];
		});
		this.removedConnections.forEach((removedConnection) => {
			graphRegistry.connections.add(removedConnection);
		});
	}
}
