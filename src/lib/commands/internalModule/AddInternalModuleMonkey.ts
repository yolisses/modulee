import { AddInternalModuleCommand } from '$lib/commands/internalModule/AddInternalModuleCommand';
import { createId } from '$lib/data/createId';
import type { EditorCommand } from '$lib/editor/EditorCommand';
import { EditorMonkey } from '$lib/monkey/EditorMonkey';
import { FAKE_PROJECT_ID } from '$lib/monkey/FAKE_PROJECT_ID';
import { faker } from '@faker-js/faker';

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
