import { Vector } from 'nodes-editor';

export class ConnectionHandler {
	end = $state<string>();
	endPosition = $state<Vector>();
	start = $state<string>();
	startPosition = $state<Vector>();
}
