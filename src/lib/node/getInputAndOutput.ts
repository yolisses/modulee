import type { Connector } from '$lib/data/Connector';
import { Input } from '$lib/data/Input.svelte';
import { Output } from '$lib/data/Output.svelte';
import type { ByIdBase } from '$lib/editor/ByIdBase';
import type { EndPreviewConnectionEvent } from 'nodes-editor';

type PossibleInputAndOutput = {
	input?: Input;
	output?: Output;
};

export function getInputAndOutput(
	e: EndPreviewConnectionEvent,
	connectors: ByIdBase<Connector>,
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
