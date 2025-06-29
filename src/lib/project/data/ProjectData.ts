import type { GraphData } from '$lib/graph/GraphData';
import type { ModuleType } from './ModuleType';

export type ProjectData = {
	id: string;
	name: string;
	userId: string;
	graph: GraphData;
	createdAt: string;
	updatedAt: string;
	description?: string;
	moduleType: ModuleType;
};
