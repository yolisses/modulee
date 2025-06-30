import type { ConnectionData } from '$lib/connection/ConnectionData';
import { EditorCommand } from '$lib/editor/EditorCommand';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';

export class AddConnectionCommand extends EditorCommand<{
	connection: ConnectionData;
}> {
	execute(graphRegistry: GraphRegistry): void {
		const { connection } = this.details;
		graphRegistry.connections.add(connection);
	}

	undo(graphRegistry: GraphRegistry): void {
		const { connection } = this.details;
		graphRegistry.connections.remove(connection);
	}
}
