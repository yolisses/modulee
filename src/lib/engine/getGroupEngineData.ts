import type { Group } from '$lib/data/Group.svelte';
import { getNodesEngineData } from './getNodesEngineData';
import type { GroupEngineData } from './GroupEngineData';
import { hashToUsize } from './hashToUsize';

// TODO use just GroupData instead of group
export function getGroupEngineData(group: Group): GroupEngineData {
	return {
		id: hashToUsize(group.id),
		nodes: getNodesEngineData(group.nodes),
	};
}
