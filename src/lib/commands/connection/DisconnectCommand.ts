import type { ConnectionData } from '$lib/data/ConnectionData';
import { getAreInputPathsEqual } from '$lib/data/getAreInputPathsEqual';
import type { GraphRegistry } from '$lib/data/GraphRegistry';
import type { InputPath } from '$lib/data/InputPath';
import { EditorCommand } from '$lib/editor/EditorCommand';

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
