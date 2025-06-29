import type { NodeData } from '$lib/node/data/NodeData';
import type { AudioInputNodeData } from '$lib/node/data/variants/AudioInputNodeData';

export function getIsAudioInputNodeData(nodeData: NodeData): nodeData is AudioInputNodeData {
	return nodeData.type === 'AudioInputNode';
}
