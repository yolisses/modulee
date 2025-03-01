import type { Vector } from 'nodes-editor';

export interface WireProps {
	isSelected?: boolean;
	endPosition: Vector;
	startPosition: Vector;
}
