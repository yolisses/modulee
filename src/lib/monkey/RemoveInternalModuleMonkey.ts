import { RemoveInternalModuleCommand } from '$lib/commands/internalModule/RemoveInternalModuleCommand';
import { createId } from '$lib/data/createId';
import type { GraphRegistry } from '$lib/data/GraphRegistry';
import { getRandomItem } from '$lib/fake/getRandomItem';
import { EditorMonkey } from './EditorMonkey';
import { FAKE_PROJECT_ID } from './FAKE_PROJECT_ID';

export class RemoveInternalModuleMonkey extends EditorMonkey {
	getCanBeUsed(graphRegistry: GraphRegistry): boolean {
		return graphRegistry.internalModules.values().length > 0;
	}

	createCommand(graphRegistry: GraphRegistry) {
		return new RemoveInternalModuleCommand({
			id: createId(),
			type: 'AddNodeCommand',
			projectId: FAKE_PROJECT_ID,
			createdAt: new Date().toJSON(),
			details: { internalModuleId: getRandomItem(graphRegistry.internalModules.values()).id },
		});
	}
}
