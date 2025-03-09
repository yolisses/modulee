import type { GraphData } from '$lib/data/GraphData';
import type { Version } from './Version';

export type ModuleData = {
	name: string;
	version: Version;
	graph: GraphData;
};
