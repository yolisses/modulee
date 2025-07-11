import type { NodeDefinition } from '../definitions/NodeDefinition';

export function createIsInputAutoConnectedMap(nodeDefinition: NodeDefinition) {
	const isInputAutoConnectedMap: Record<string, boolean> = {};
	nodeDefinition.inputs.forEach((inputDefinition) => {
		if (!inputDefinition.autoConnection) return;
		const { byDefault } = inputDefinition.autoConnection;
		isInputAutoConnectedMap[inputDefinition.key] = byDefault;
	});
	return isInputAutoConnectedMap;
}
