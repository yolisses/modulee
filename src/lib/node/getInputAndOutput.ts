import type { Connector } from '$lib/connector/Connector';
import { Input } from '$lib/data/input/Input.sveltesvelte';
import { Output } from '$lib/data/node/Output.sveltevelte';
import type { ById } from '$lib/editor/ById';
import type { EndPreviewConnectionEvent } from 'nodes-editor';

type PossibleInputAndOutput = {
	input?: Input;
	output?: Output;
};

export function getInputAndOutput(
	e: EndPreviewConnectionEvent,
	connectors: ById<Connector>,
): PossibleInputAndOutput {
	const result: PossibleInputAndOutput = {
		input: undefined,
		output: undefined,
	};
	const startConnector = connectors.getOrNull(e.startConnectorId);
	const endConnector = e.endConnectorId ? connectors.getOrNull(e.endConnectorId) : undefined;

	if (startConnector instanceof Input) {
		result.input = startConnector;
	}
	if (startConnector instanceof Output) {
		result.output = startConnector;
	}
	if (endConnector instanceof Input) {
		result.input = endConnector;
	}
	if (endConnector instanceof Output) {
		result.output = endConnector;
	}

	return result;
}
