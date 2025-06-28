import type { InternalModule } from '$lib/data/InternalModule.svelte';
import type { ModuleNode } from '$lib/data/ModuleNode.svelte';
import { getIsSomeModuleNode } from './getIsSomeModuleNode';

export function getRackModuleItemModuleNodes(internalModule: InternalModule): ModuleNode[] {
	const moduleNodes = internalModule.nodes
		.filter(getIsSomeModuleNode)
		.filter((moduleNode) => !!moduleNode.targetModule);
	return moduleNodes;
}
