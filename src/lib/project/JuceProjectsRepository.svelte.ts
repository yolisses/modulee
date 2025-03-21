import type { GraphData } from '$lib/data/GraphData';
import type { ProjectData } from './ProjectData';
import type { ProjectsRepository } from './ProjectsRepository';

export class JuceProjectsRepository implements ProjectsRepository {
	isInitialized = $state(false);
	juceLibrary!: typeof import('../juce');

	async initialize(): Promise<void> {
		this.juceLibrary = await import('../juce');
		this.isInitialized = true;
	}

	getIsInitialized(): boolean {
		return this.isInitialized;
	}

	onProjectsChange?: (() => void) | undefined;

	async getProjects(): Promise<ProjectData[]> {
		const getProjects = this.juceLibrary.getNativeFunction('getProjects');
		const projectsJson = await getProjects();
		return JSON.parse(projectsJson);
	}

	async deleteProject(id: string): Promise<void> {
		const deleteProject = this.juceLibrary.getNativeFunction('deleteProject');
		await deleteProject(id);
		this.onProjectsChange?.();
	}

	async getProject(id: string): Promise<ProjectData> {
		const getProject = this.juceLibrary.getNativeFunction('getProject');
		const projectJson = await getProject(id);
		return JSON.parse(projectJson);
	}

	async createProject(projectData: ProjectData): Promise<void> {
		const createProject = this.juceLibrary.getNativeFunction('createProject');
		const projectDataJson = JSON.stringify(projectData);
		await createProject(projectDataJson);
		this.onProjectsChange?.();
	}

	async renameProject(id: string, name: string): Promise<void> {
		const renameProject = this.juceLibrary.getNativeFunction('renameProject');
		await renameProject(id, name);
		this.onProjectsChange?.();
	}

	async updateProjectGraphData(id: string, graphData: GraphData): Promise<void> {
		const updateProjectGraphData = this.juceLibrary.getNativeFunction('updateProjectGraphData');
		await updateProjectGraphData(id, JSON.stringify(graphData));
	}
}
