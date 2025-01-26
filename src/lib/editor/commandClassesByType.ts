import type { CommandClass } from './CommandClass.js';
import { commandClasses } from './commandClasses.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const commandClassesByType: Record<string, CommandClass<any>> = {};

commandClasses.forEach((commandClass) => {
	commandClassesByType[commandClass.name] = commandClass;
});
