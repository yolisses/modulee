import type { ProjectData } from './ProjectData';
import type { ProjectsRepository } from './ProjectsRepository';

export class LocalProjectsRepository implements ProjectsRepository {
	getProjects(): ProjectData[] {
		const projectsString = localStorage.getItem('projects') || '[]';
		const projectsData = JSON.parse(projectsString);
		return projectsData;
	}

	getProject(id: string): ProjectData {
		throw new Error('Method not implemented.');
	}
}
