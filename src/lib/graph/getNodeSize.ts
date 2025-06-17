import type { Node } from '$lib/data/Node.svelte';
import { nodeDefinitionsByName } from '$lib/node/definitions/nodeDefinitionsByName';
import { NODE_ITEM_WIDTH } from '$lib/node/NODE_ITEM_WIDTH';
import { Vector } from 'nodes-editor';

// DEBT
// TODO remove this node item separate size calculation
export function getNodeSize(node: Node) {
	const headerHeight = 1;
	const inputsHeight = nodeDefinitionsByName[node.type].inputs.length;
	return new Vector(NODE_ITEM_WIDTH, inputsHeight + headerHeight);
}
