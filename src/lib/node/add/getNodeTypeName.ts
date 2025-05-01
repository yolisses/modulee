import { nodesName } from './nodeNames';
import type { NodeType } from './NodeType';

export function getNodeTypeName(nodeType: NodeType) {
	return nodesName[nodeType.name];
}
