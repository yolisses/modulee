import type { NodeDefinition } from '../definitions/NodeDefinition';

export function getCanNodeBeCreated(nodeDefinition: NodeDefinition) {
	return !new Set(['ControlNode']).has(nodeDefinition.type);
}
