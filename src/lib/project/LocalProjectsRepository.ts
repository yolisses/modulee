import { findById } from '$lib/array/findById';
import type { ProjectData } from './ProjectData';
import type { ProjectsRepository } from './ProjectsRepository';

export class LocalProjectsRepository implements ProjectsRepository {
	getProjects(): ProjectData[] {
		const projectsString = localStorage.getItem('projects') || '[]';
		const projectsData = JSON.parse(projectsString);
		return projectsData;
	}

	getProject(id: string): ProjectData {
		const projects = this.getProjects();
		return findById(projects, id);
	}

	createProject(projectData: ProjectData): void {
		const projects = this.getProjects();
		projects.push(projectData);
		const projectsString = JSON.stringify(projects);
		localStorage.setItem('projects', projectsString);
	}
}
