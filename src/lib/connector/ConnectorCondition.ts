import { getGraphContext } from '$lib/data/graphContext';
import { Input } from '$lib/data/Input.svelte';
import { Output } from '$lib/data/Output.svelte';
import type { ConnectionCondition } from 'nodes-editor';

// TODO Find a better name for this
export class ConnectorCondition {
	graphContext = getGraphContext();

	endConnectorCondition: ConnectionCondition = ({ endConnectorId, startConnectorId }) => {
		if (endConnectorId === startConnectorId) return false;

		const { graph } = this.graphContext;
		const endConnector = graph.connectors.getOrNull(endConnectorId);
		const startConnector = graph.connectors.getOrNull(startConnectorId);

		if (startConnector instanceof Input && endConnector instanceof Input) return false;
		if (startConnector instanceof Output && endConnector instanceof Output) return false;
		return true;
	};
}
