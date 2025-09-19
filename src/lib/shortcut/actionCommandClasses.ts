import type { ActionCommandClass } from './actionCommandClass';
import { actionCommandClassesByType } from './actionCommandClassesByType';

export const actionCommandClasses: ActionCommandClass[] = Object.values(actionCommandClassesByType);
