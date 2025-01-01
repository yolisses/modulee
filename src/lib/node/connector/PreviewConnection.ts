import type { Wire } from '$lib/wire/Wire';
import type { Connector } from './Connector.svelte';

export type PreviewConnection = {
	wire: Wire;
	startConnector: Connector;
	finalConnector: Connector;
};
