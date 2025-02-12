import type { Connection } from '$lib/data/Connection';
import type { Group } from '$lib/data/Group.svelte';
import { getNodesEngineData } from './getNodesEngineData';
import type { GroupEngineData } from './GroupEngineData';
import { hashToUsize } from './hashToUsize';

// TODO use just GroupData instead of group
export function getGroupEngineData(
	group: Group,
	groups: Group[],
	connections: Connection[],
): GroupEngineData {
	return {
		id: hashToUsize(group.id),
		nodes: getNodesEngineData(group.nodes, groups, connections),
	};
}
