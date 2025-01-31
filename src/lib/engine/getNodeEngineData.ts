import type { Node } from '$lib/data/Node.svelte';
import { hashToUsize } from './hashToUsize';
import type { NodeEngineData } from './NodeEngineData';

export function getNodeEngineData(node: Node, fallbackId: number): NodeEngineData {
	const inputIds: Record<string, number | undefined> = {};
	node.inputs.forEach((input) => {
		const outputId = input.connectedOutput?.node.id;
		inputIds[input.name] = outputId ? hashToUsize(outputId) : fallbackId;
	});

	const extras: Record<string, number> = {};

	for (const key in node.extras) {
		const value = node.extras[key];
		if (typeof value === 'string') {
			extras[key] = hashToUsize(value);
		} else {
			extras[key] = value;
		}
	}

	return {
		extras,
		type: node.type,
		input_ids: inputIds,
		id: hashToUsize(node.id),
	};
}
