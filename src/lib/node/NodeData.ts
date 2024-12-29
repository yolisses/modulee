import type { VectorData } from '$lib/space/VectorData';
import type { ConnectorData } from './connector/ConnectorData';

export type NodeData = {
	id: string;
	size: VectorData;
	position: VectorData;
	connectors: ConnectorData[];
};
