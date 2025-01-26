import { Input } from '$lib/data/Input.svelte.js';
import { Output } from '$lib/data/Output.svelte.js';
import type { Connector } from 'nodes-editor';

export function endConnectorCondition(endConnector: Connector, startConnector: Connector) {
	if (endConnector === startConnector) return false;
	if (startConnector instanceof Input && endConnector instanceof Input) return false;
	if (startConnector instanceof Output && endConnector instanceof Output) return false;
	return true;
}
