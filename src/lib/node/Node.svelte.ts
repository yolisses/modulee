import { Vector } from '$lib/space/Vector';
import { Connector } from './connector/Connector.svelte';
import type { NodeData } from './NodeData';

export class Node {
	id: string;
	size: Vector;
	position: Vector = $state()!;
	connectors: Connector[] = [];

	constructor(nodeData: NodeData) {
		const { connectors, id, position, size } = nodeData;
		this.id = id;
		this.size = Vector.fromData(size);
		this.position = Vector.fromData(position);
		this.connectors = connectors.map((connectorData, index) => {
			return new Connector(connectorData, this, index);
		});
	}

	getData(): NodeData {
		return {
			id: this.id,
			size: this.size,
			position: this.position,
			connectors: this.connectors.map((connector) => connector.getData()),
		};
	}
}
