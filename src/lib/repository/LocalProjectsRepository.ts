import type { ProjectData } from '$lib/data/ProjectData';
import type { ProjectsRepository } from './ProjectsRepository';

export class LocalProjectsRepository implements ProjectsRepository {
	getUserProjects(): ProjectData[] {
		throw new Error('Method not implemented.');
	}

	getProject(id: string): ProjectData {
		throw new Error('Method not implemented.');
	}
}
