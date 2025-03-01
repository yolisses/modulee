import type { GraphData } from '$lib/data/GraphData';
import type { InputPath } from '$lib/data/InputPath';
import type { GroupNodeData } from '$lib/data/variants/GroupNodeData';
import type { GroupVoicesNodeData } from '$lib/data/variants/GroupVoicesNodeData';

// TODO consider adopting an OOP approach
export function getGroupNodeInputPaths(
	groupNodeData: GroupNodeData | GroupVoicesNodeData,
	graphData: GraphData,
) {
	const inputPaths: InputPath[] = [];
	const { targetGroupId } = groupNodeData.extras;
	graphData.nodes.values().forEach((nodeData) => {
		if (nodeData.type !== 'InputNode') return;
		if (nodeData.groupId !== targetGroupId) return;
		inputPaths.push({
			inputName: nodeData.id,
			nodeId: groupNodeData.id,
		});
	});
	return inputPaths;
}
