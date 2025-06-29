import type { NodeData } from '$lib/node/data/NodeData';
import type { SomeModuleNodeData } from './SomeModuleNodeData';

export function getIsSomeModuleNodeData(nodeData: NodeData): nodeData is SomeModuleNodeData {
	return nodeData.type === 'ModuleNode' || nodeData.type === 'ModuleVoicesNode';
}
