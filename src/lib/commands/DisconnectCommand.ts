import type { ConnectionData } from '$lib/data/ConnectionData';
import { getAreInputPathsEqual } from '$lib/data/getAreInputPathsEqual';
import type { InputPath } from '$lib/data/InputPath';
import { Command } from '$lib/editor/Command';
import type { EditorData } from '$lib/editor/EditorData';

export class DisconnectCommand extends Command<{
	inputPath: InputPath;
}> {
	connectionsData!: ConnectionData[];

	execute(editorData: EditorData): void {
		this.connectionsData = editorData.connections.removeByCondition((connectionData) =>
			getAreInputPathsEqual(connectionData.inputPath, this.details.inputPath),
		);
	}

	undo(editorData: EditorData): void {
		this.connectionsData.forEach((connectionData) => {
			editorData.connections.add(connectionData);
		});
	}
}
