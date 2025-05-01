import type { NodeType } from './NodeType';
import { nodeTypeCategories } from './nodeTypeCategories';

export const nodeTypes: NodeType[] = nodeTypeCategories.flatMap((nodeTypeCategory) => {
	return nodeTypeCategory.nodeTypes;
});
