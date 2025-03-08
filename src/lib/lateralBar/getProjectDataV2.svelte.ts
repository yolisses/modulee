import type { GraphData } from '$lib/data/GraphData';
import type { ProjectData } from '$lib/project/ProjectData';
import type { ProjectDataV2 } from '../project/ProjectDataV2';
import { getGraphDataV2 } from './getGraphDataV2';

export function getProjectDataV2(projectData: ProjectData, graphData: GraphData): ProjectDataV2 {
	const { id, name } = projectData;
	const graphDataV2 = getGraphDataV2(graphData);
	const rawGraphData2 = $state.snapshot(graphDataV2);
	return { id, name, graphData: rawGraphData2 };
}
