import { AddInternalModuleCommand } from '$lib/commands/internalModule/AddInternalModuleCommand';
import { createId } from '$lib/data/createId';
import type { EditorCommand } from '$lib/editor/EditorCommand';
import { faker } from '@faker-js/faker';
import { EditorMonkey } from '../../monkey/EditorMonkey';
import { FAKE_PROJECT_ID } from '../../monkey/FAKE_PROJECT_ID';

export class AddInternalModuleMonkey extends EditorMonkey {
	getCanBeUsed(): boolean {
		return true;
	}

	createCommand(): EditorCommand {
		return new AddInternalModuleCommand({
			id: createId(),
			projectId: FAKE_PROJECT_ID,
			createdAt: new Date().toJSON(),
			type: 'AddInternalModuleCommand',
			details: {
				internalModule: {
					id: createId(),
					name: faker.word.noun(),
				},
			},
		});
	}
}
