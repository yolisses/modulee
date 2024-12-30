import { Vector } from '$lib/space/Vector';
import type { Node } from '../Node.svelte';
import type { ConnectorData } from './ConnectorData';

export class Connector {
	id: string;
	name: string;
	connectedTo?: Connector;

	constructor(
		connectorData: ConnectorData,
		private node: Node,
		private index: number,
	) {
		const { id, name } = connectorData;
		this.id = id;
		this.name = name;
	}

	assignConnectedTo(connectedTo: Connector) {
		this.connectedTo = connectedTo;
	}

	get position() {
		const headerOffset = new Vector(0, 1);
		const indexOffset = new Vector(0, this.index);
		const centeringOffset = Vector.fromNumber(0.5);
		return this.node.position.add(headerOffset).add(indexOffset).add(centeringOffset);
	}

	getData(): ConnectorData {
		return {
			id: this.id,
			name: this.name,
		};
	}
}
