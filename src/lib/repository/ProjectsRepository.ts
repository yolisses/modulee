import type { ProjectData } from '$lib/data/ProjectData';

export interface ProjectsRepository {
	getUserProjects(): ProjectData[];
	getProject(id: string): ProjectData;
}
