import type { GraphData } from '$lib/data/GraphData';

export type ProjectData = {
	id: string;
	name: string;
	graphData: GraphData;
	description?: string;
};
