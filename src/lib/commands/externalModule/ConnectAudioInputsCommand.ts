import type { ConnectionData } from '$lib/data/ConnectionData';
import type { GraphRegistry } from '$lib/data/GraphRegistry';
import { EditorCommand } from '$lib/editor/EditorCommand';
import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';
import { getIsSomeModuleNodeData } from '$lib/rack/getIsSomeModuleNodeData';

export class ConnectAudioInputsCommand extends EditorCommand<{
	targetNodeId: string;
	moduleNodeId: string;
	externalModuleData: ExternalModuleData;
	audioInputConnectionIds: Record<string, string>;
}> {
	static name = 'ConnectAudioInputsCommand';

	removedConnections!: ConnectionData[];

	execute(graphRegistry: GraphRegistry): void {
		const { moduleNodeId, targetNodeId, externalModuleData, audioInputConnectionIds } =
			this.details;
		const { nodes, mainInternalModuleId } = externalModuleData.graph;

		const audioInputNodes = nodes.filter(
			(node) => node.internalModuleId === mainInternalModuleId && node.type === 'AudioInputNode',
		);
		const audioInputIds = audioInputNodes.map((audioInputNode) => audioInputNode.id);

		const nodeData = graphRegistry.nodes.get(moduleNodeId);
		if (!getIsSomeModuleNodeData(nodeData)) {
			throw new Error('Invalid node type');
		}

		// Remove connections previous connections to audio inputs
		this.removedConnections = graphRegistry.connections.removeByCondition((connection) => {
			return (
				connection.inputPath.nodeId === moduleNodeId &&
				audioInputIds.indexOf(connection.inputPath.inputKey) !== -1
			);
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
