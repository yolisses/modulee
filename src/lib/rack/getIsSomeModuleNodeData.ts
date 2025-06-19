import type { NodeData } from '$lib/data/NodeData';
import type { ModuleNodeData } from '$lib/data/variants/ModuleNodeData';

export function getIsSomeModuleNodeData(nodeData: NodeData): nodeData is ModuleNodeData {
	return nodeData.type === 'ModuleNode' || nodeData.type === 'ModuleVoicesNode';
}
