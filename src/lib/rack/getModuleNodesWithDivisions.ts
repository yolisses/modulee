import { expandById } from '$lib/array/expandById';
import { createId } from '$lib/global/createId';
import type { ModuleNode } from '$lib/node/ModuleNode.svelte';
import { getAudioTopologicalMap } from './getAudioTopologicalMap';
import { getChains } from './getChains';

type Item = { fakeId: string; node?: ModuleNode };

function getNodeItem(node: ModuleNode): Item {
	return {
		node,
		fakeId: createId(),
	};
}

function createDivisionItem(): Item {
	return {
		fakeId: createId(),
	};
}

// fakeId is used to prevent an integration bug on Svelte and Sortable-js, since
//  both change the order of the elements
export function getModuleNodesWithDivisions(moduleNodes: ModuleNode[]) {
	const idChains = getChains(getAudioTopologicalMap(moduleNodes));
	const chains = idChains.map((idChain) => expandById(moduleNodes, idChain));

	const itemsWithEndDivision: Item[] = chains
		.map((chain) => [...chain.map(getNodeItem), createDivisionItem()])
		.flat();
	const items = itemsWithEndDivision.slice(0, -1);
	return items;
}
