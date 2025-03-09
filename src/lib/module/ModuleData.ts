import type { GraphData } from '$lib/data/GraphData';
import type { Version } from './Version';

export type ModuleData = {
	id: string;
	name: string;
	graph: GraphData;
	version: Version;
	projectId: string;
};
