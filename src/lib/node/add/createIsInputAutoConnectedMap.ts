import type { NodeDefinition } from '../definitions/NodeDefinition';

export function createIsInputAutoConnectedMap(nodeDefinition: NodeDefinition) {
	const isInputAutoConnectedMap: Record<string, boolean> = {};
	nodeDefinition.inputs.forEach((inputDefinition) => {
		const { canBeAutoConnected, autoConnectedByDefault } = inputDefinition;
		if (canBeAutoConnected) {
			isInputAutoConnectedMap[inputDefinition.key] = autoConnectedByDefault;
		}
	});
	return isInputAutoConnectedMap;
}
