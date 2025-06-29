import { getNodeDataInputKeys } from '$lib/fake/getNodeDataInputKeys';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';

export function getNodesThatHaveInputs(graphRegistry: GraphRegistry) {
	return graphRegistry.nodes.values().filter((nodeData) => {
		return getNodeDataInputKeys(nodeData, graphRegistry).length > 0;
	});
}
