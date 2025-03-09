import type { ConnectionData } from '$lib/data/ConnectionData';
import { getAreInputPathsEqual } from '$lib/data/getAreInputPathsEqual';
import type { GraphRegistry } from '$lib/data/GraphRegistry';
import type { InputPath } from '$lib/data/InputPath';
import { EditorCommand } from '$lib/editor/EditorCommand';

export class DisconnectCommand extends EditorCommand<{
	inputPath: InputPath;
}> {
	static name = 'DisconnectCommand';

	connectionsData!: ConnectionData[];

	execute(graphData: GraphRegistry): void {
		this.connectionsData = graphData.connections.removeByCondition((connectionData) =>
			getAreInputPathsEqual(connectionData.inputPath, this.details.inputPath),
		);
	}

	undo(graphData: GraphRegistry): void {
		this.connectionsData.forEach((connectionData) => {
			graphData.connections.add(connectionData);
		});
	}
}
