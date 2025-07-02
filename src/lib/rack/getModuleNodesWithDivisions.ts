import { expandById } from '$lib/array/expandById';
import { createId } from '$lib/global/createId';
import type { ModuleNode } from '$lib/node/ModuleNode.svelte';
import { CHAIN_DIVISION_PREFIX } from './CHAIN_DIVISION_PREFIX';
import { getAudioTopologicalMap } from './getAudioTopologicalMap';
import { getChains } from './getChains';

type Item = { type: 'division'; id: string } | { type: 'node'; id: string; node: ModuleNode };

function getNodeItem(node: ModuleNode): Item {
	return {
		node,
		id: node.id,
		type: 'node',
	};
}

function createDivisionItem(): Item {
	return {
		type: 'division' as const,
		id: CHAIN_DIVISION_PREFIX + createId(),
	};
}

export function getModuleNodesWithDivisions(moduleNodes: ModuleNode[]) {
	const idChains = getChains(getAudioTopologicalMap(moduleNodes));
	const chains = idChains.map((idChain) => expandById(moduleNodes, idChain));

	const itemsWithEndDivision: Item[] = chains
		.map((chain) => [...chain.map(getNodeItem), createDivisionItem()])
		.flat();
	const items = itemsWithEndDivision.slice(0, -1);
	return items;
}
