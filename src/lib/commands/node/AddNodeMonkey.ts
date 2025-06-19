import { AddNodeCommand } from '$lib/commands/node/AddNodeCommand';
import { createId } from '$lib/data/createId';
import type { GraphRegistry } from '$lib/data/GraphRegistry';
import { createFakePosition } from '$lib/fake/createFakePosition';
import { getRandomItem } from '$lib/fake/getRandomItem';
import { EditorMonkey } from '$lib/monkey/EditorMonkey';
import { FAKE_PROJECT_ID } from '$lib/monkey/FAKE_PROJECT_ID';
import { nodeDefinitions } from '$lib/node/definitions/nodeDefinitions';
import { getNodeDataFromNodeDefinition } from '$lib/process/implicitNodes/addImplicitNodes';

export class AddNodeMonkey extends EditorMonkey {
	getCanBeUsed(graphRegistry: GraphRegistry): boolean {
		return graphRegistry.internalModules.values().length > 0;
	}

	createCommand(graphRegistry: GraphRegistry) {
		const nodeDefinition = getRandomItem(nodeDefinitions);
		const node = getNodeDataFromNodeDefinition(
			createId(),
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
