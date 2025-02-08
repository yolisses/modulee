import type { Node } from '$lib/data/Node.svelte';
import { hashToUsize } from './hashToUsize';

export function getNodeInputIdsEngineData(node: Node, fallbackNodeId: number) {
	const inputIds: Record<string, number> = {};
	node.inputs.forEach((input) => {
		const outputId = input.connectedOutput?.node.id;
		inputIds[input.name] = outputId ? hashToUsize(outputId) : fallbackNodeId;
	});
	return inputIds;
}
