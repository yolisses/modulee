import type { Remotion } from '$lib/array/remotion';
import { removeById } from '$lib/array/removeById';
import type { ConnectionData } from '$lib/data/ConnectionData';
import { Command } from '$lib/editor/Command';
import type { EditorData } from '$lib/editor/EditorData';
import { DisconnectCommand } from './Disconnect';
import { mockCommandData } from './test/mockNodeData';

// TODO add Command suffix
export class SetConnection extends Command<{
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
		editorData.connections.push(this.details.connection);
	}

	undo(editorData: EditorData): void {
		removeById(editorData.connections, this.details.connection.id);
		this.disconnectCommand.undo(editorData);
	}
}
