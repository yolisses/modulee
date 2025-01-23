import type { ProjectData } from '$lib/project/ProjectData';

export interface ProjectsRepository {
	getProjects(): ProjectData[];
	getProject(id: string): ProjectData;
}
