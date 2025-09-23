import type { EditorCommand } from '$lib/editor/EditorCommand';
import { getRandomFloat } from '$lib/fake/getRandomFloat';
import { getRandomItem } from '$lib/fake/getRandomItem';
import { createId } from '$lib/global/createId';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import { EditorMonkey } from '$lib/monkey/EditorMonkey';
import { FAKE_PROJECT_ID } from '$lib/monkey/FAKE_PROJECT_ID';
import { SetConstantNodeValueCommand } from './SetConstantNodeValueCommand';

export class SetConstantNodeValueMonkey extends EditorMonkey {
	getConstantNodes(graphRegistry: GraphRegistry) {
		return graphRegistry.nodes.values().filter((nodeData) => {
			return nodeData.type === 'ConstantNode';
		});
	}

	getCanBeUsed(graphRegistry: GraphRegistry): boolean {
		return this.getConstantNodes(graphRegistry).length > 0;
	}

	createCommand(graphRegistry: GraphRegistry): EditorCommand {
		return new SetConstantNodeValueCommand({
			id: createId(),
			projectId: FAKE_PROJECT_ID,
			createdAt: new Date().toJSON(),
			type: 'SetConstantNodeValueCommand',
			details: {
				value: getRandomFloat(-10, 10),
				nodeId: getRandomItem(this.getConstantNodes(graphRegistry)).id,
			},
		});
	}
}
