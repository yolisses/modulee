import type { Command } from './Command';

export type EditorData = {
	history: Command[];
	undoneHistory: Command[];
};
