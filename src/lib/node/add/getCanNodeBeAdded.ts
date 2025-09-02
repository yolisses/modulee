import type { NodeDefinition } from '../definitions/NodeDefinition';

export function getCanNodeBeAdded(nodeDefinition: NodeDefinition) {
	return !nodeDefinition.isIntermediary;
}
