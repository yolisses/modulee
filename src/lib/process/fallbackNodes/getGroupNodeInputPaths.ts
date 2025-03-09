import type { GraphRegistry } from '$lib/data/GraphRegistry';
import type { InputPath } from '$lib/data/InputPath';
import type { GroupNodeData } from '$lib/data/variants/GroupNodeData';
import type { GroupVoicesNodeData } from '$lib/data/variants/GroupVoicesNodeData';

// TODO consider adopting an OOP approach
export function getGroupNodeInputPaths(
	groupNodeData: GroupNodeData | GroupVoicesNodeData,
	graphRegistry: GraphRegistry,
) {
	const inputPaths: InputPath[] = [];
	const { targetGroupId } = groupNodeData.extras;
	graphRegistry.nodes.values().forEach((nodeData) => {
		if (nodeData.type !== 'InputNode') return;
		if (nodeData.groupId !== targetGroupId) return;
		inputPaths.push({
			inputKey: nodeData.id,
			nodeId: groupNodeData.id,
		});
	});
	return inputPaths;
}
