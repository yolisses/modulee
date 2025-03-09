import type { GraphRegistry } from '$lib/data/GraphRegistry';
import type { GroupData } from '$lib/data/GroupData';
import { getNodeEngineData } from './getNodeEngineData';
import type { GroupEngineData } from './GroupEngineData';
import { hashToUsize } from './hashToUsize';

// TODO use just GroupData instead of group
export function getGroupEngineData(
	groupData: GroupData,
	graphData: GraphRegistry,
): GroupEngineData {
	const groupNodes = graphData.nodes.values().filter((nodeData) => {
		return nodeData.groupId === groupData.id;
	});
	return {
		id: hashToUsize(groupData.id),
		nodes: groupNodes.map((nodeData) => getNodeEngineData(nodeData, graphData)),
	};
}
