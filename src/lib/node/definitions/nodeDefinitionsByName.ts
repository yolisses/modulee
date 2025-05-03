import type { NodeDefinition } from './NodeDefinition';
import { nodeDefinitions } from './nodeDefinitions';

export const nodeDefinitionsByName: Record<string, NodeDefinition> = {};

nodeDefinitions.forEach((nodeDefinition) => {
	nodeDefinitionsByName[nodeDefinition.name] = nodeDefinition;
});
