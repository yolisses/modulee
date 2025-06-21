import type { NodeData } from '$lib/data/NodeData';
import type { AudioInputNodeData } from '$lib/data/variants/AudioInputNodeData';

export function getIsAudioInputNodeData(nodeData: NodeData): nodeData is AudioInputNodeData {
	return nodeData.type === 'AudioInputNode';
}
