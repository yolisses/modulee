import type { ProjectData } from '$lib/project/ProjectData';
import { getIsSomeModuleNodeData } from '$lib/rack/getIsSomeModuleNodeData';

export function getExternalModuleIdsFromProject(project: ProjectData): string[] {
	const externalModuleIds: string[] = [];
	project.graph.nodes.forEach((nodeData) => {
		if (!getIsSomeModuleNodeData(nodeData)) return;
		const { moduleReference } = nodeData.extras;
		if (moduleReference?.type !== 'external') return;
		externalModuleIds.push(moduleReference.moduleId);
	});
	return externalModuleIds;
}
