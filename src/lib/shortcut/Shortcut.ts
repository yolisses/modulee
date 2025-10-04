import type { actionCommandClassesByType } from './actionCommandClassesByType';

export type Shortcut = {
	keys: string[];
	commandType: keyof typeof actionCommandClassesByType;
};
