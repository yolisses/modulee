import type { EditorCommand } from '$lib/editor/EditorCommand';
import { getRandomItem } from '$lib/fake/getRandomItem';
import { createId } from '$lib/global/createId';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import { EditorMonkey } from '$lib/monkey/EditorMonkey';
import { FAKE_PROJECT_ID } from '$lib/monkey/FAKE_PROJECT_ID';
import { faker } from '@faker-js/faker';
import { RenameInternalModuleCommand } from './RenameInternalModuleCommand';

export class RenameInternalModuleMonkey extends EditorMonkey {
	getCanBeUsed(graphRegistry: GraphRegistry): boolean {
		return graphRegistry.internalModules.values().length > 0;
	}

	createCommand(graphRegistry: GraphRegistry): EditorCommand {
		return new RenameInternalModuleCommand({
			id: createId(),
			projectId: FAKE_PROJECT_ID,
			createdAt: new Date().toJSON(),
			type: 'RenameInternalModuleCommand',
			details: {
				name: faker.word.noun(),
				internalModuleId: getRandomItem(graphRegistry.internalModules.values()).id,
			},
		});
	}
}
