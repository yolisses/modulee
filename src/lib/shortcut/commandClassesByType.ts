import type { CommandClass } from './commandClass';
import { commandClasses } from './commandClasses';

export const commandClassesByType: Record<string, CommandClass> = {};

commandClasses.forEach((commandClass) => {
	commandClassesByType[commandClass.name] = commandClass;
});
