import type { Node } from '$lib/data/Node.svelte';
import { hashToUsize } from './hashToUsize';
import type { NodeEngineData } from './NodeEngineData';

export function getNodeEngineData(node: Node, fallbackId: number): NodeEngineData {
	const inputIds: Record<string, number | undefined> = {};
	node.inputs.forEach((input) => {
		const outputId = input.connectedOutput?.node.id;
		inputIds[input.name] = outputId ? hashToUsize(outputId) : fallbackId;
	});

	return {
		type: node.type,
		input_ids: inputIds,
		extras: node.extras,
		id: hashToUsize(node.id),
	};
}
