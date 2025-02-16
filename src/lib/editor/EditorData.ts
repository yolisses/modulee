import type { GraphData } from '$lib/data/GraphData';
import type { Command } from './Command';

export type EditorData = GraphData & {
	history: Command[];
	undoneHistory: Command[];
};
