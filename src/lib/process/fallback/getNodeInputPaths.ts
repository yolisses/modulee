import type { GraphData } from '$lib/data/GraphData';
import type { InputPath } from '$lib/data/InputPath';
import type { NodeData } from '$lib/data/NodeData';
import { nodeTypesByName } from '$lib/node/add/nodeTypesById';

export function getNodeInputPaths(nodeData: NodeData, graphData: GraphData) {
	const inputPaths: InputPath[] = [];

	const nodeType = nodeTypesByName[nodeData.type];
	nodeType.inputNames.forEach((inputName) => {
		inputPaths.push({ inputName, nodeId: nodeData.id });
	});

	if (nodeData.type === 'GroupNode' || nodeData.type === 'GroupVoicesNode') {
		const groupNodeData = nodeData;
		const { targetGroupId } = groupNodeData.extras;

		graphData.nodes.values().forEach((nodeData) => {
			if (nodeData.type !== 'InputNode') return;
			if (nodeData.groupId !== targetGroupId) return;
			inputPaths.push({
				inputName: nodeData.id,
				nodeId: groupNodeData.id,
			});
		});
	}

	return inputPaths;
}
