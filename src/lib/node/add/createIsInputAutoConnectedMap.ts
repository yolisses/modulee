import type { NodeDefinition } from '../definitions/NodeDefinition';

export function createIsInputAutoConnectedMap(nodeDefinition: NodeDefinition) {
	const isInputAutoConnectedMap: Record<string, boolean> = {};
	nodeDefinition.inputs.forEach((inputDefinition) => {
		isInputAutoConnectedMap[inputDefinition.key] = inputDefinition.autoConnectedByDefault;
	});
	return isInputAutoConnectedMap;
}
