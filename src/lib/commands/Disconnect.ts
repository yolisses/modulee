import { reinsert } from '$lib/array/reinsert';
import type { Remotion } from '$lib/array/remotion';
import { removeByCondition } from '$lib/array/removeByCondition';
import type { ConnectionData } from '$lib/data/ConnectionData';
import { getAreInputPathsEqual } from '$lib/data/getAreInputPathsEqual';
import type { InputPath } from '$lib/data/InputPath';
import { Command } from '$lib/editor/Command';
import type { EditorData } from '$lib/editor/EditorData';

export class DisconnectCommand extends Command<{
	inputPath: InputPath;
}> {
	remotions!: Remotion<ConnectionData>[];

	execute(editorData: EditorData): void {
		this.remotions = removeByCondition(editorData.connections, (connectionData) =>
			getAreInputPathsEqual(connectionData.inputPath, this.details.inputPath),
		);
	}

	undo(editorData: EditorData): void {
		this.remotions.forEach((remotion) => {
			reinsert(editorData.connections, remotion);
		});
	}
}
