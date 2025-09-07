import type { Vector } from 'nodes-editor';

export type Connection = {
	endId: string;
	endPosition: Vector;
	startId: string;
	startPosition: Vector;
};
