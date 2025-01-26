import { commandClassesByType } from './commandClassesByType.js';
import type { CommandData } from './CommandData.js';

export function instantiateCommand(commandData: CommandData) {
	const constructor = commandClassesByType[commandData.type];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return new constructor(commandData as any);
}
