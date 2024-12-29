import type { Vector } from '$lib/space/Vector';
import type { Connector } from './Connector';

export type Node = {
	id: string;
	size: Vector;
	position: Vector;
	connectors: Connector[];
};
