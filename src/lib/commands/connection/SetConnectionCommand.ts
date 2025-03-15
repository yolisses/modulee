import type { Remotion } from '$lib/array/remotion';
import type { ConnectionData } from '$lib/data/ConnectionData';
import type { GraphRegistry } from '$lib/data/GraphRegistry';
import { EditorCommand } from '$lib/editor/EditorCommand';
import { mockCommandData } from '../test/mockNodeData';
import { DisconnectCommand } from './DisconnectCommand';

export class SetConnectionCommand extends EditorCommand<{
	connection: ConnectionData;
}> {
	static name = 'SetConnectionCommand';

	disconnectCommand!: DisconnectCommand;
	remotions!: Remotion<ConnectionData>[];

	execute(graphRegistry: GraphRegistry): void {
		const { connection } = this.details;
		this.disconnectCommand = new DisconnectCommand(
			mockCommandData({ inputPath: connection.inputPath }),
		);
		this.disconnectCommand.execute(graphRegistry);
		graphRegistry.connections.set(this.details.connection);
	}

	undo(graphRegistry: GraphRegistry): void {
		graphRegistry.connections.remove(this.details.connection);
		this.disconnectCommand.undo(graphRegistry);
	}
}
