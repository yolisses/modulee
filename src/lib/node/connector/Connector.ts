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
		return this.node.position.add(new Vector(0, this.index));
	}
}
