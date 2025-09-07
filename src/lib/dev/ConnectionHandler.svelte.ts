import { Vector } from 'nodes-editor';

export class ConnectionHandler {
	end = $state<string>();
	endPosition = $state<Vector>(new Vector(0, 0));
	start = $state<string>();
	startPosition = $state<Vector>(new Vector(100, 200));
}
