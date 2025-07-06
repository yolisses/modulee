import { getNodeDefinitionName } from '../definitions/getNodeDefinitionName';
import { nodeDefinitions } from '../definitions/nodeDefinitions';

export class AddNodeMenuSearchState {
	searchText = $state('');

	getOptions() {
		return nodeDefinitions.filter((nodeDefinition) => {
			return getNodeDefinitionName(nodeDefinition)
				.toLowerCase()
				.includes(this.searchText.toLowerCase());
		});
	}
}
