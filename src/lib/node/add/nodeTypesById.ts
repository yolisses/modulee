import type { NodeType } from './NodeType';
import { nodeTypes } from './nodeTypes';

export const nodeTypesByName: Record<string, NodeType> = {};

nodeTypes.forEach((nodeType) => {
	nodeTypesByName[nodeType.name] = nodeType;
});
