import type { Space } from '$lib/space/Space.js';
import type { Vector } from 'nodes-editor';

export interface WireProps {
	space: Space;
	endPosition: Vector;
	startPosition: Vector;
}
