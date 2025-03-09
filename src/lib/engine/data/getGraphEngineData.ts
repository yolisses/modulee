import type { GraphRegistry } from '$lib/data/GraphRegistry';
import { getGroupEngineData } from './getGroupEngineData';
import type { GraphEngineData } from './GraphEngineData';
import { hashToUsize } from './hashToUsize';

export function getGraphEngineData(graphRegistry: GraphRegistry): GraphEngineData {
	return {
		main_group_id: graphRegistry ? hashToUsize(graphRegistry.mainGroupId) : undefined,
		groups: graphRegistry.groups
			.values()
			.map((groupData) => getGroupEngineData(groupData, graphRegistry)),
	};
}
