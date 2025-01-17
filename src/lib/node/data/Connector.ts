import type { Vector } from 'nodes-editor';

export interface Connector {
	id: string;
	name: string;
	position: Vector;
	jointPosition: Vector;
}
