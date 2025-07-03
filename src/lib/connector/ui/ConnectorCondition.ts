import { getRequiredContext } from '$lib/global/getRequiredContext';
import { graphContextKey } from '$lib/graph/graphContext';
import { Input } from '$lib/input/Input';
import { Output } from '$lib/node/Output';
import type { ConnectionCondition } from 'nodes-editor';

export class ConnectorCondition {
	graphContext = getRequiredContext(graphContextKey);

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
