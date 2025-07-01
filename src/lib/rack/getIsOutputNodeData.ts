import type { NodeData } from '$lib/node/data/NodeData';
import type { OutputNodeData } from '$lib/node/data/variants/OutputNodeData';

export function getIsOutputNodeData(nodeData: NodeData): nodeData is OutputNodeData {
	return nodeData.type === 'OutputNode';
}
