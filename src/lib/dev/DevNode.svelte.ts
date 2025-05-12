import type { Vector } from 'nodes-editor';

export class Node {
	position = $state<Vector>()!;
	constructor(position: Vector) {
		this.position = position;
	}
}
