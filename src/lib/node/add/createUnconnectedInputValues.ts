import type { NodeDefinition } from '../definitions/NodeDefinition';

export function createUnconnectedInputValues(nodeDefinition: NodeDefinition) {
	const unconnectedInputValues: Record<string, number> = {};
	nodeDefinition.inputs.forEach((inputDefinition) => {
		unconnectedInputValues[inputDefinition.key] = inputDefinition.defaultValue;
	});
	return unconnectedInputValues;
}
