import { AddNodeCommand } from '$lib/commands/node/AddNodeCommand';
import { createFakePosition } from '$lib/fake/createFakePosition';
import { getRandomItem } from '$lib/fake/getRandomItem';
import { createId } from '$lib/global/createId';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import { EditorMonkey } from '$lib/monkey/EditorMonkey';
import { FAKE_PROJECT_ID } from '$lib/monkey/FAKE_PROJECT_ID';
import { createNodeData } from '$lib/node/add/createNodeData';
import { nodeDefinitions } from '$lib/node/definitions/nodeDefinitions';

export class AddNodeMonkey extends EditorMonkey {
	getCanBeUsed(graphRegistry: GraphRegistry): boolean {
		return graphRegistry.internalModules.values().length > 0;
	}

	createCommand(graphRegistry: GraphRegistry) {
		const nodeDefinition = getRandomItem(nodeDefinitions);
		const node = createNodeData(
			nodeDefinition,
			getRandomItem(graphRegistry.internalModules.ids()),
			createFakePosition(),
		);
		return new AddNodeCommand({
			id: createId(),
			details: { node },
			type: 'AddNodeCommand',
			projectId: FAKE_PROJECT_ID,
			createdAt: new Date().toJSON(),
		});
	}
}
