import { Vector } from '$lib/space/Vector';
import { Connector } from './connector/Connector';
import type { NodeData } from './NodeData';

export class Node {
	id: string;
	size: Vector;
	position: Vector;
	connectors: Connector[] = [];

	constructor(nodeData: NodeData) {
		const { connectors, id, position, size } = nodeData;
		this.id = id;
		this.size = Vector.fromData(size);
		this.position = Vector.fromData(position);
		this.connectors = connectors.map((connectorData) => new Connector(connectorData));
	}
}
