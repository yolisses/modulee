import type { Vector } from '$lib/space/Vector';

export interface Connector {
	id: string;
	position: Vector;
	jointPosition: Vector;
}
