import type { NodeData } from '$lib/data/NodeData';
import type { InputNodeData } from '$lib/data/variants/InputNodeData';

export function getIsInputNodeData(nodeData: NodeData): nodeData is InputNodeData {
	return nodeData.type === 'InputNode';
}
