import { AddInternalModuleWithOutputNodeCommand } from '$lib/commands/internalModule/AddInternalModuleWithOutputNodeCommand';
import type { EditorCommand } from '$lib/editor/EditorCommand';
import { createId } from '$lib/global/createId';
import { EditorMonkey } from '$lib/monkey/EditorMonkey';
import { FAKE_PROJECT_ID } from '$lib/monkey/FAKE_PROJECT_ID';
import { faker } from '@faker-js/faker';

export class AddInternalModuleWithOutputNodeMonkey extends EditorMonkey {
	getCanBeUsed(): boolean {
		return true;
	}

	createCommand(): EditorCommand {
		const internalModuleId = createId();
		return new AddInternalModuleWithOutputNodeCommand({
			id: createId(),
			projectId: FAKE_PROJECT_ID,
			createdAt: new Date().toJSON(),
			type: 'AddInternalModuleWithOutputNodeCommand',
			details: {
				internalModule: {
					id: internalModuleId,
					name: faker.word.noun(),
				},
				node: {
					extras: { channel: 0 },
					id: createId(),
					internalModuleId,
					isInputAutoConnectedMap: { input: false },
					position: { x: 0, y: 0 },
					type: 'OutputNode',
					unconnectedInputValues: { input: 0 },
				},
			},
		});
	}
}
