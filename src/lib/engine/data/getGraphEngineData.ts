import type { GraphData } from '$lib/data/GraphData';
import { getGroupEngineData } from './getGroupEngineData';
import type { GraphEngineData } from './GraphEngineData';

export function getGraphEngineData(graphData: GraphData): GraphEngineData {
	return {
		groups: graphData.groups.values().map((groupData) => getGroupEngineData(groupData, graphData)),
	};
}
