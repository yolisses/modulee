import type { GraphData } from '$lib/data/GraphData';
import type { ModuleType } from './ModuleType';

export type ProjectData = {
	id: string;
	name: string;
	graph: GraphData;
	createdAt: string;
	updatedAt: string;
	description?: string;
	moduleType: ModuleType;
};
