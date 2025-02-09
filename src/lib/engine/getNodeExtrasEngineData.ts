import { GroupNode } from '$lib/data/GroupNode.svelte';
import type { Node } from '$lib/data/Node.svelte';
import { hashToUsize } from './hashToUsize';
import type { NodeExtrasEngineData } from './NodeEngineData';

export function getNodeExtrasEngineData(node: Node, fallbackNodeId: number): NodeExtrasEngineData {
	if (node instanceof GroupNode) {
		const input_target_ids = new Map();
		console.log(node.inputs);
		node.inputs.forEach((input) => {
			const { connectedOutputId } = input;
			const inputId = hashToUsize(input.name);
			const targetId = connectedOutputId ? hashToUsize(connectedOutputId) : fallbackNodeId;
			input_target_ids.set(inputId, targetId);
		});
		return { input_target_ids };
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
