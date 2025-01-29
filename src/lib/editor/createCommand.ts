import { commandClassesByType } from './commandClassesByType';
import type { CommandData } from './CommandData';

export function createCommand(commandData: CommandData) {
	const constructor = commandClassesByType[commandData.type];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const command = new constructor(commandData as any);
	command.createCommandCallback = createCommand;
	return command;
}
