import type { ProjectData } from './ProjectData';

export function getProjectFriendlyPath(projectData: ProjectData) {
	if (projectData.moduleType === 'instrument') {
		return `/projects/${projectData.id}/rack`;
	} else {
		const { mainInternalModuleId } = projectData.graph;
		return `/projects/${projectData.id}/internalModules/${mainInternalModuleId}/graph`;
	}
}
