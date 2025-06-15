import type { NodeDefinitionCategory } from './NodeDefinitionCategory';
import { nodeDefinitions } from './nodeDefinitions';

export const nodeDefinitionCategories = Object.values(
	nodeDefinitions.reduce<Record<string, NodeDefinitionCategory>>((acc, nodeDef) => {
		const category = nodeDef.category;
		if (!acc[category]) {
			acc[category] = { name: category, nodeDefinitions: [] };
		}
		acc[category].nodeDefinitions.push(nodeDef);
		return acc;
	}, {}),
);
