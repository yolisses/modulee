import type { Group } from '$lib/data/Group.svelte';
import { getNodeEngineData } from './getNodeEngineData';
import type { GroupEngineData } from './GroupEngineData';
import { hashToUsize } from './hashToUsize';

export function getGroupEngineData(group: Group): GroupEngineData {
	return {
		id: hashToUsize(group.id),
		nodes: group.nodes.map(getNodeEngineData),
	};
}
