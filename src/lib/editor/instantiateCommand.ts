import { commandClassesByType } from './commandClassesByType';
import type { CommandData } from './CommandData';

export function instantiateCommand(commandData: CommandData) {
	const constructor = commandClassesByType[commandData.type];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return new constructor(commandData.details as any);
}
