import type { NodeData } from '$lib/data/NodeData';
import { hashToUsize } from './hashToUsize';

export function getDefaultNodeExtrasEngineData(nodeData: NodeData) {
	const extras: Record<string, number> = {};
	for (const key in nodeData.extras) {
		const value = nodeData.extras[key];
		if (typeof value === 'string') {
			extras[key] = hashToUsize(value);
		} else {
			extras[key] = value;
		}
	}
	return extras;
}
