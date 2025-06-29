import type { ConnectionData } from '$lib/connection/ConnectionData';
import { getIsDefined } from '$lib/connection/getIsDefined';
import { EditorCommand } from '$lib/editor/EditorCommand';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';

export class RemoveConnectionsCommand extends EditorCommand<{
	connectionIds: string[];
}> {
	connectionsData!: ConnectionData[];

	execute(graphRegistry: GraphRegistry): void {
		const { connectionIds } = this.details;
		this.connectionsData = connectionIds
			.map((connectionId) => {
				return graphRegistry.connections.removeById(connectionId);
			})
			.filter(getIsDefined);
	}

	undo(graphRegistry: GraphRegistry): void {
		graphRegistry.connections.addMany(this.connectionsData);
	}
}
