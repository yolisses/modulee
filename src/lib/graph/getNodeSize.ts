import type { Node } from '$lib/data/Node.svelte';
import { nodeDefinitionsByName } from '$lib/node/definitions/nodeDefinitionsByName';
import { nodeItemWidth } from '$lib/node/nodeItemWidth';
import { Vector } from 'nodes-editor';

// DEBT
// TODO remove this node item separate size calculation
export function getNodeSize(node: Node) {
	const headerHeight = 1;
	const inputsHeight = nodeDefinitionsByName[node.type].inputs.length;
	return new Vector(nodeItemWidth, inputsHeight + headerHeight);
}
