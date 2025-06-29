import type { NodeData } from '$lib/data/NodeData';
import { hashToUsize } from './hashToUsize';

export function getDefaultNodeExtrasEngineData(nodeData: NodeData) {
	const extras: Record<string, number> = {};
	for (const key in nodeData.extras) {
		const value = (nodeData.extras as Record<string, string | number>)[key];
		if (typeof value === 'string') {
			extras[key] = hashToUsize(value);
		} else {
			extras[key] = value;
		}
	}
	return extras;
}
