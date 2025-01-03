import type { Vector } from '$lib/space/Vector';
import type { Connector } from '../connector/Connector';

export type PreviewConnection = {
	startConnector: Connector;
	endConnector?: Connector;
	dataPointerPosition: Vector;
};
