import type { CommandData } from '$lib/editor/CommandData';
import { commandClassesByType } from './commandClassesByType';

export function createCommand(commandData: CommandData) {
	const constructor = commandClassesByType[commandData.type];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const command = new constructor(commandData as any);
	command.createCommandCallback = createCommand;
	return command;
}
