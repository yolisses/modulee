import type { InputPath } from '$lib/input/InputPath';
import type { ConnectionData } from './ConnectionData';

export class Connection {
	id: string;
	inputPath: InputPath;
	targetNodeId: string;

	constructor(connectionData: ConnectionData) {
		const { id, inputPath, targetNodeId } = connectionData;
		this.id = id;
		this.inputPath = inputPath;
		this.targetNodeId = targetNodeId;
	}
}
