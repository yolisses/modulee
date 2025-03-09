import type { GraphRegistry } from '$lib/data/GraphRegistry';
import type { ProjectData } from '$lib/project/ProjectData';
import type { ProjectDataV2 } from '../project/ProjectDataV2';
import { getGraphData } from './getGraphDataV2';

export function getProjectDataV2(
	projectData: ProjectData,
	graphRegistry: GraphRegistry,
): ProjectDataV2 {
	const { id, name } = projectData;
	const graphRegistryV2 = getGraphData(graphRegistry);
	const rawGraphRegistry2 = $state.snapshot(graphRegistryV2);
	return { id, name, graphRegistry: rawGraphRegistry2 };
}
