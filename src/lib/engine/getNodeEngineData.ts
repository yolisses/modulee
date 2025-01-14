import type { Node } from '$lib/node/Node.svelte';
import { hashToUsize } from './hashToUsize';
import type { NodeEngineData } from './NodeEngineData';

export function getNodeEngineData(node: Node): NodeEngineData {
	const inputIds: Record<string, number | undefined> = {};
	node.inputs.forEach((input) => {
		const outputId = input.connectedOutput?.node.id;
		if (outputId) {
			inputIds[input.name] = hashToUsize(outputId);
		}
	});

	return {
		type: node.type,
		input_ids: inputIds,
		extras: node.extras,
		id: hashToUsize(node.id),
	};
}
