import type { ActionCommandClass } from './actionCommandClass';
import { actionCommandClasses } from './actionCommandClasses';

export const actionCommandClassesByType: Record<string, ActionCommandClass> = {};

actionCommandClasses.forEach((commandClass) => {
	actionCommandClassesByType[commandClass.name] = commandClass;
});
