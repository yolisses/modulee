import type { NodeData } from '$lib/node/data/NodeData';
import type { InputNodeData } from '$lib/node/data/variants/InputNodeData';

export function getIsInputNodeData(nodeData: NodeData): nodeData is InputNodeData {
	return nodeData.type === 'InputNode';
}
