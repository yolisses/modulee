import { createId } from '$lib/data/createId';
import { getRandomItem } from '$lib/fake/getRandomItem';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import { EditorMonkey } from '$lib/monkey/EditorMonkey';
import { FAKE_PROJECT_ID } from '$lib/monkey/FAKE_PROJECT_ID';
import { DisconnectCommand } from './DisconnectCommand';

export class DisconnectMonkey extends EditorMonkey {
	getCanBeUsed(graphRegistry: GraphRegistry): boolean {
		return graphRegistry.connections.values().length > 0;
	}

	createCommand(graphRegistry: GraphRegistry) {
		return new DisconnectCommand({
			id: createId(),
			type: 'DisconnectCommand',
			projectId: FAKE_PROJECT_ID,
			createdAt: new Date().toJSON(),
			details: {
				inputPath: getRandomItem(graphRegistry.connections.values()).inputPath,
			},
		});
	}
}
