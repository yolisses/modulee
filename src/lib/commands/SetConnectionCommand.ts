import type { Remotion } from '$lib/array/remotion';
import type { ConnectionData } from '$lib/data/ConnectionData';
import { Command } from '$lib/editor/Command';
import type { EditorData } from '$lib/editor/EditorData';
import { DisconnectCommand } from './DisconnectCommand';
import { mockCommandData } from './test/mockNodeData';

// TODO add Command suffix
export class SetConnectionCommand extends Command<{
	connection: ConnectionData;
}> {
	disconnectCommand!: DisconnectCommand;
	remotions!: Remotion<ConnectionData>[];

	execute(editorData: EditorData): void {
		const { connection } = this.details;
		this.disconnectCommand = new DisconnectCommand(
			mockCommandData({ inputPath: connection.inputPath }),
		);
		this.disconnectCommand.execute(editorData);
		editorData.connections.set(this.details.connection);
	}

	undo(editorData: EditorData): void {
		editorData.connections.remove(this.details.connection);
		this.disconnectCommand.undo(editorData);
	}
}
