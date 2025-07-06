import { Input } from '$lib/input/Input';
import type { Connector } from 'nodes-editor';
import { Output } from './Output';

type PossibleInputAndOutput = {
	input?: Input;
	output?: Output;
};

export function getInputAndOutput({
	startConnector,
	endConnector,
}: {
	startConnector: Connector;
	endConnector?: Connector;
}): PossibleInputAndOutput {
	const result: PossibleInputAndOutput = {
		input: undefined,
		output: undefined,
	};

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
