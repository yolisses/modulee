import type { GraphRegistry } from '$lib/data/GraphRegistry';
import { cloneGraphRegistry } from './cloneGraphRegistry';
import { addFallbackNodes } from './fallbackNodes/addFallbackNodes';
import { addImplicitNodes } from './implicitNodes/addImplicitNodes';

export function getProcessedGraphRegistry(graphRegistry: GraphRegistry) {
	const graphRegistryClone = cloneGraphRegistry(graphRegistry);
	addImplicitNodes(graphRegistryClone);
	addFallbackNodes(graphRegistryClone);
	return graphRegistryClone;
}
