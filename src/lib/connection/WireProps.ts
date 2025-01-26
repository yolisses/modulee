import type { Space } from '$lib/space/Space';
import type { Vector } from 'nodes-editor';

export interface WireProps {
	space: Space;
	endPosition: Vector;
	startPosition: Vector;
}
