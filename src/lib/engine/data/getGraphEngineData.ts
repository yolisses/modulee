import type { GraphRegistry } from '$lib/data/GraphRegistry';
import { getGroupEngineData } from './getGroupEngineData';
import type { GraphEngineData } from './GraphEngineData';
import { hashToUsize } from './hashToUsize';

export function getGraphEngineData(graphData: GraphRegistry): GraphEngineData {
	return {
		main_group_id: graphData ? hashToUsize(graphData.mainGroupId) : undefined,
		groups: graphData.groups.values().map((groupData) => getGroupEngineData(groupData, graphData)),
	};
}
