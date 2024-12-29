import type { ConnectorData } from './ConnectorData';

export class Connector {
	id: string;
	name: string;

	constructor(connectorData: ConnectorData) {
		const { id, name } = connectorData;
		this.id = id;
		this.name = name;
	}
}
