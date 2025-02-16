import type { Connection } from '$lib/data/Connection';
import { getAreInputPathsEqual } from '$lib/data/getAreInputPathsEqual';
import { GroupNode } from '$lib/data/GroupNode.svelte';
import type { Node } from '$lib/data/Node.svelte';
import { hashToUsize } from './hashToUsize';
import type { NodeExtrasEngineData } from './NodeEngineData';

export function getNodeExtrasEngineData(
	node: Node,
	fallbackNodeId: number,
	connections: Connection[],
): NodeExtrasEngineData {
	if (node instanceof GroupNode) {
		const input_target_ids = new Map();
		node.inputs.forEach((input) => {
			const inputIdHash = hashToUsize(input.id);
			connections.forEach((connection) => {
				if (getAreInputPathsEqual(connection.inputPath, input.inputPath)) {
					input_target_ids.set(inputIdHash, hashToUsize(connection.targetNodeId));
					return;
				}
			});
			input_target_ids.set(inputIdHash, fallbackNodeId);
		});

		const target_group_id = node.targetGroupId ? hashToUsize(node.targetGroupId) : undefined;
		return { input_target_ids, target_group_id };
	} else {
		const extras: Record<string, number> = {};
		for (const key in node.extras) {
			const value = node.extras[key];
			if (typeof value === 'string') {
				extras[key] = hashToUsize(value);
			} else {
				extras[key] = value;
			}
		}
		return extras;
	}
}
