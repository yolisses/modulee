import { createId } from '$lib/data/createId';
import { getNodeDataInputKeys } from '$lib/fake/getNodeDataInputKeys';
import { getRandomDistinctItems } from '$lib/fake/getRandomDistinctItems';
import { getRandomItem } from '$lib/fake/getRandomItem';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import { EditorMonkey } from '$lib/monkey/EditorMonkey';
import { FAKE_PROJECT_ID } from '$lib/monkey/FAKE_PROJECT_ID';
import { getNodesThatHaveInputs } from '../../monkey/getNodesThatHaveInputs';
import { SetConnectionCommand } from './SetConnectionCommand';

export class SetConnectionMonkey extends EditorMonkey {
	getCanBeUsed(graphRegistry: GraphRegistry): boolean {
		return getNodesThatHaveInputs(graphRegistry).length > 2;
	}

	createCommand(graphRegistry: GraphRegistry) {
		const [node1, node2] = getRandomDistinctItems(getNodesThatHaveInputs(graphRegistry), 2);
		return new SetConnectionCommand({
			id: createId(),
			details: {
				connection: {
					id: createId(),
					inputPath: {
						nodeId: node1.id,
						inputKey: getRandomItem(getNodeDataInputKeys(node1, graphRegistry)),
					},
					targetNodeId: node2.id,
				},
			},
			type: 'AddNodeCommand',
			projectId: FAKE_PROJECT_ID,
			createdAt: new Date().toJSON(),
		});
	}
}
