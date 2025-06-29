import { RemoveNodeCommand } from '$lib/commands/node/RemoveNodeCommand';
import { createId } from '$lib/data/createId';
import { getRandomItem } from '$lib/fake/getRandomItem';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import { EditorMonkey } from '$lib/monkey/EditorMonkey';
import { FAKE_PROJECT_ID } from '$lib/monkey/FAKE_PROJECT_ID';

export class RemoveNodeMonkey extends EditorMonkey {
	getCanBeUsed(graphRegistry: GraphRegistry): boolean {
		return graphRegistry.nodes.values().length > 0;
	}

	createCommand(graphRegistry: GraphRegistry) {
		return new RemoveNodeCommand({
			id: createId(),
			type: 'AddNodeCommand',
			projectId: FAKE_PROJECT_ID,
			createdAt: new Date().toJSON(),
			details: { nodeId: getRandomItem(graphRegistry.nodes.values()).id },
		});
	}
}
