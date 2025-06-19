import { AddNodeCommand } from '$lib/commands/node/AddNodeCommand';
import { RemoveNodeCommand } from '$lib/commands/node/RemoveNodeCommand';
import { createId } from '$lib/data/createId';
import type { GraphRegistry } from '$lib/data/GraphRegistry';
import type { InternalModuleData } from '$lib/data/InternalModuleData';
import { ById } from '$lib/editor/ById';
import type { EditorCommand } from '$lib/editor/EditorCommand';
import { createFakePosition } from '$lib/fake/createFakePosition';
import { getRandomItem } from '$lib/fake/getRandomItem';
import { nodeDefinitions } from '$lib/node/definitions/nodeDefinitions';
import { getNodeDataFromNodeDefinition } from '$lib/process/implicitNodes/addImplicitNodes';
import { test } from 'vitest';

const FAKE_PROJECT_ID = createId();

abstract class Monkey {
	abstract getCanBeUsed(graphRegistry: GraphRegistry): boolean;
	abstract createCommand(graphRegistry: GraphRegistry): EditorCommand;
}

class AddNodeMonkey extends Monkey {
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

class RemoveNodeMonkey extends Monkey {
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

const monkeys = [AddNodeMonkey, RemoveNodeMonkey];

test('editorMonkey', () => {
	// By now, every graph needs a main internal module. It can be changed
	// latter.
	const mainInternalModule: InternalModuleData = { id: createId(), name: 'Main internal module' };
	const internalModules = new ById<InternalModuleData>();
	internalModules.add(mainInternalModule);

	const graphRegistry: GraphRegistry = {
		connections: new ById(),
		nodes: new ById(),
		externalModuleReferences: new ById(),
		internalModules,
		mainInternalModuleId: mainInternalModule.id,
	};
});
