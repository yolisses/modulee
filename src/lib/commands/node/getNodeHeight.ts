import { nodeDefinitionsByName } from '$lib/node/definitions/nodeDefinitionsByName';

export function getNodeHeight(type: string) {
	console.log(type);
	const definition = nodeDefinitionsByName[type];
	let height = definition.inputs.length;

	// header height
	height += 1;

	const specialTypes = new Set(['InputNodeData', 'ConstantNodeData']);

	if (specialTypes.has(type)) {
		height += 1;
	}

	// TODO handle cases for ModuleNodeData and ModuleVoicesNodeData
	return height;
}
