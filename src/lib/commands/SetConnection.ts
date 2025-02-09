import { reinsert } from '$lib/array/reinsert';
import type { Remotion } from '$lib/array/remotion';
import { removeByCondition } from '$lib/array/removeByCondition';
import { removeById } from '$lib/array/removeById';
import type { ConnectionData } from '$lib/data/ConnectionData';
import { Command } from '$lib/editor/Command';
import type { EditorData } from '$lib/editor/EditorData';

export class SetConnection extends Command<{
	connection: ConnectionData;
}> {
	remotions!: Remotion<ConnectionData>[];

	getHaveSomeInputPath(connection1: ConnectionData, connection2: ConnectionData) {
		return (
			connection1.nodeId === connection2.nodeId && connection1.inputName === connection2.inputName
		);
	}

	execute(editorData: EditorData): void {
		this.remotions = removeByCondition(editorData.connections, (connection) =>
			this.getHaveSomeInputPath(connection, this.details.connection),
		);
		editorData.connections.push(this.details.connection);
	}

	undo(editorData: EditorData): void {
		removeById(editorData.connections, this.details.connection.id);
		this.remotions.forEach((remotion) => {
			reinsert(editorData.connections, remotion);
		});
	}
}
