import { Input } from '$lib/input/Input';
import { getInputAndOutput } from '$lib/node/getInputAndOutput';
import { Output } from '$lib/node/Output';
import type { ConnectionCondition } from 'nodes-editor';

export class ConnectorCondition {
	endConnectorCondition: ConnectionCondition = ({ endConnector, startConnector }) => {
		const { input, output } = getInputAndOutput({ startConnector, endConnector });
		if (input?.node.id === output?.node.id) return false;

		if (startConnector instanceof Input && endConnector instanceof Input) return false;
		if (startConnector instanceof Output && endConnector instanceof Output) return false;
		return true;
	};
}
