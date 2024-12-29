import type { Vector } from '$lib/space/Vector';
import type { Connector } from './connector/Connector';
import { defaultNodeSize } from './defaultNodeSize';

export class Node {
	connectors: Connector[] = [];
	size: Vector = defaultNodeSize;

	constructor(
		public id: string,
		public position: Vector,
	) {}
}
