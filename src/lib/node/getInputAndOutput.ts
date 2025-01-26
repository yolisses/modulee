import { Input } from '$lib/data/Input.svelte.js';
import { Output } from '$lib/data/Output.svelte.js';
import type { EndPreviewConnectionEvent } from 'nodes-editor';

type PossibleInputAndOutput = {
	input?: Input;
	output?: Output;
};

export function getInputAndOutput(e: EndPreviewConnectionEvent): PossibleInputAndOutput {
	const result: PossibleInputAndOutput = {
		input: undefined,
		output: undefined,
	};

	if (e.startConnector instanceof Input) {
		result.input = e.startConnector;
	}
	if (e.startConnector instanceof Output) {
		result.output = e.startConnector;
	}
	if (e.endConnector instanceof Input) {
		result.input = e.endConnector;
	}
	if (e.endConnector instanceof Output) {
		result.output = e.endConnector;
	}

	return result;
}
