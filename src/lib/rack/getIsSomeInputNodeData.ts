import type { NodeData } from '$lib/node/data/NodeData';
import type { SomeInputNodeData } from './SomeInputNodeData';

export function getIsSomeInputNodeData(nodeData: NodeData): nodeData is SomeInputNodeData {
	return nodeData.type === 'InputNode' || nodeData.type === 'AudioInputNode';
}
