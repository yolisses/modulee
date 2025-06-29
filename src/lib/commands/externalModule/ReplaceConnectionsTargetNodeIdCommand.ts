import { EditorCommand } from '$lib/editor/EditorCommand';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';

export class ReplaceConnectionsTargetNodeIdCommand extends EditorCommand<{
	targetId: string;
	connectionIds: string[];
}> {
	previousTargetIds!: string[];

	execute(graphRegistry: GraphRegistry): void {
		const { targetId, connectionIds } = this.details;
		this.previousTargetIds = [];
		connectionIds.forEach((connectionId) => {
			const connection = graphRegistry.connections.get(connectionId);
			this.previousTargetIds.push(connection.targetNodeId);
			connection.targetNodeId = targetId;
		});
	}

	undo(graphRegistry: GraphRegistry): void {
		const { connectionIds } = this.details;
		connectionIds.forEach((connectionId, index) => {
			graphRegistry.connections.get(connectionId).targetNodeId = this.previousTargetIds[index];
		});
	}
}
