import { createId } from '$lib/data/createId';
import type { GraphRegistry } from '$lib/data/GraphRegistry';
import { getRandomDistinctItems } from '$lib/fake/getRandomDistinctItems';
import { getRandomInt } from '$lib/fake/getRandomInt';
import { EditorMonkey } from '$lib/monkey/EditorMonkey';
import { FAKE_PROJECT_ID } from '$lib/monkey/FAKE_PROJECT_ID';
import { getId } from '$lib/ui/getId';
import { RemoveNodesCommand } from './RemoveNodesCommand';

export class RemoveNodesMonkey extends EditorMonkey {
	getCanBeUsed(graphRegistry: GraphRegistry): boolean {
		return graphRegistry.nodes.values().length > 0;
	}

	createCommand(graphRegistry: GraphRegistry) {
		const nodeOptions = graphRegistry.nodes.values();
		return new RemoveNodesCommand({
			id: createId(),
			type: 'MoveNodeCommand',
			projectId: FAKE_PROJECT_ID,
			createdAt: new Date().toJSON(),
			details: {
				nodeIds: getRandomDistinctItems(nodeOptions, getRandomInt(1, nodeOptions.length)).map(
					getId,
				),
			},
		});
	}
}
