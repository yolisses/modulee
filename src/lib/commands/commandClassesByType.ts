import type { CommandClass } from '$lib/editor/CommandClass';
import { commandClasses } from './commandClasses';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const commandClassesByType: Record<string, CommandClass<any>> = {};

commandClasses.forEach((commandClass) => {
	commandClassesByType[commandClass.name] = commandClass;
});
