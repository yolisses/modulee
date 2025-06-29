import type { ConnectionData } from '$lib/data/ConnectionData';
import { getAreInputPathsEqual } from '$lib/data/getAreInputPathsEqual';
import { EditorCommand } from '$lib/editor/EditorCommand';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import type { InputPath } from '$lib/input/InputPath';

/**
 * Removes all the connections to one input path
 */
export class DisconnectCommand extends EditorCommand<{
	inputPath: InputPath;
}> {
	static name = 'DisconnectCommand';

	connectionsData!: ConnectionData[];

	execute(graphRegistry: GraphRegistry): void {
		this.connectionsData = graphRegistry.connections.removeByCondition((connectionData) =>
			getAreInputPathsEqual(connectionData.inputPath, this.details.inputPath),
		);
	}

	undo(graphRegistry: GraphRegistry): void {
		this.connectionsData.forEach((connectionData) => {
			graphRegistry.connections.add(connectionData);
		});
	}
}
