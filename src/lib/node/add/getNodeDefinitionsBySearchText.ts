import { getNodeDefinitionName } from '../definitions/getNodeDefinitionName';
import { nodeDefinitions } from '../definitions/nodeDefinitions';

export function getNodeDefinitionsBySearchText(searchText: string) {
	return nodeDefinitions.filter((nodeDefinition) => {
		return getNodeDefinitionName(nodeDefinition).toLowerCase().includes(searchText.toLowerCase());
	});
}
