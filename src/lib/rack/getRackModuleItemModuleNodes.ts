import { getIsDefined } from '$lib/connection/getIsDefined';
import { getGraphTopologicalMap } from '$lib/connection/getNodesTopologicalMap';
import { getTopologicalOrder } from '$lib/connection/getTopologicalOrder';
import type { InternalModule } from '$lib/module/internalModule/InternalModule';
import type { ModuleNode } from '$lib/node/ModuleNode.svelte';
import { getIsSomeModuleNode } from './getIsSomeModuleNode';

export function getRackModuleItemModuleNodes(internalModule: InternalModule): ModuleNode[] {
	const topologicalMap = getGraphTopologicalMap(internalModule.nodes);
	const topologicalOrder = getTopologicalOrder(topologicalMap);
	const nodes = topologicalOrder
		.map((id) => internalModule.nodes.find((node) => node.id === id))
		.filter(getIsDefined);

	const moduleNodes = nodes
		.filter(getIsSomeModuleNode)
		.filter((moduleNode) => !!moduleNode.targetModule);

	return moduleNodes;
}
