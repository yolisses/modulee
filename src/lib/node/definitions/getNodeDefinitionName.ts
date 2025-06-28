import type { NodeDefinition } from './NodeDefinition';
import { nodesName } from './nodesName';

export function getNodeDefinitionName(nodeDefinition: NodeDefinition) {
	return nodesName[nodeDefinition.type];
}
