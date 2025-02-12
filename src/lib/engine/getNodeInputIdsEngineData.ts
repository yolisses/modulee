import type { Connection } from '$lib/data/Connection';
import { getAreInputPathsEqual } from '$lib/data/getAreInputPathsEqual';
import type { Node } from '$lib/data/Node.svelte';
import { hashToUsize } from './hashToUsize';

export function getNodeInputIdsEngineData(
	node: Node,
	fallbackNodeId: number,
	connections: Connection[],
) {
	const inputIds: Record<string, number> = {};
	node.inputs.forEach((input) => {
		const connection = connections.find((connection) => {
			const { inputPath } = connection;
			return getAreInputPathsEqual(inputPath, {
				nodeId: node.id,
				inputName: input.name,
			});
		});
		const outputId = connection?.targetNodeId;
		inputIds[input.name] = outputId ? hashToUsize(outputId) : fallbackNodeId;
	});
	return inputIds;
}
