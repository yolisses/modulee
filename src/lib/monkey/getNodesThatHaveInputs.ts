import type { GraphRegistry } from '$lib/data/GraphRegistry';
import { getNodeDataInputKeys } from '$lib/fake/getNodeDataInputKeys';

export function getNodesThatHaveInputs(graphRegistry: GraphRegistry) {
	return graphRegistry.nodes.values().filter((nodeData) => {
		return getNodeDataInputKeys(nodeData, graphRegistry).length > 0;
	});
}
