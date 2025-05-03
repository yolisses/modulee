import type { NodeDefinition } from './NodeDefinition';
import { nodeDefinitionCategories } from './nodeDefinitionCategories';

export const nodeDefinitions: NodeDefinition[] = nodeDefinitionCategories.flatMap(
	(nodeDefinitionCategory) => {
		return nodeDefinitionCategory.nodeDefinitions;
	},
);
