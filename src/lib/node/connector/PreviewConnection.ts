import type { Vector } from '$lib/space/Vector';
import type { Connector } from './Connector.svelte';

export type PreviewConnection = {
	dataPointerPosition: Vector;
	startConnector: Connector;
	finalConnector?: Connector;
};
