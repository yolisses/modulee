import type { ProjectData } from './data/ProjectData';

export function getProjectFriendlyPath(projectData: ProjectData) {
	const { mainInternalModuleId } = projectData.graph;
	const voiceModule = projectData.graph.internalModules.find((internalModule) => {
		return internalModule.name === 'Voice module';
	});
	const internalModuleId = voiceModule?.id ?? mainInternalModuleId;
	return `/projects/${projectData.id}/internalModules/${internalModuleId}/graph`;
}
