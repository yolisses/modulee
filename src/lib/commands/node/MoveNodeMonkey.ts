import { createId } from '$lib/data/createId';
import type { GraphRegistry } from '$lib/data/GraphRegistry';
import { createFakePosition } from '$lib/fake/createFakePosition';
import { getRandomItem } from '$lib/fake/getRandomItem';
import { EditorMonkey } from '$lib/monkey/EditorMonkey';
import { FAKE_PROJECT_ID } from '$lib/monkey/FAKE_PROJECT_ID';
import { MoveNodeCommand } from './MoveNodeCommand';

export class MoveNodeMonkey extends EditorMonkey {
	getCanBeUsed(graphRegistry: GraphRegistry): boolean {
		return graphRegistry.nodes.values().length > 0;
	}

	createCommand(graphRegistry: GraphRegistry) {
		return new MoveNodeCommand({
			id: createId(),
			type: 'MoveNodeCommand',
			projectId: FAKE_PROJECT_ID,
			createdAt: new Date().toJSON(),
			details: {
				delta: createFakePosition(),
				nodeId: getRandomItem(graphRegistry.nodes.values()).id,
			},
		});
	}
}
