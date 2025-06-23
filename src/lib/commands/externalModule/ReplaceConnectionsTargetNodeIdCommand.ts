import type { ConnectionData } from '$lib/data/ConnectionData';
import type { GraphRegistry } from '$lib/data/GraphRegistry';
import { EditorCommand } from '$lib/editor/EditorCommand';

export class ReplaceConnectionsTargetNodeIdCommand extends EditorCommand<{
	newTargetId: string;
	previousTargetId: string;
}> {
	connections!: ConnectionData[];

	execute(graphRegistry: GraphRegistry): void {
		const { newTargetId, previousTargetId } = this.details;
		this.connections = [];
		graphRegistry.connections.values().forEach((connectionData) => {
			if (connectionData.targetNodeId === previousTargetId) {
				this.connections.push(connectionData);
				connectionData.targetNodeId = newTargetId;
			}
		});
	}

	undo(): void {
		const { previousTargetId } = this.details;
		this.connections.forEach((connection) => {
			connection.targetNodeId = previousTargetId;
		});
	}
}
