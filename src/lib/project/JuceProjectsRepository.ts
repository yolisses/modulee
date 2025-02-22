import type { CommandData } from '$lib/editor/CommandData';
import type { ProjectData } from './ProjectData';
import type { ProjectsRepository } from './ProjectsRepository';

export class JuceProjectsRepository implements ProjectsRepository {
	isInitialized = false;

	async initialize(): Promise<void> {
		const juceLibrary = await import('../juce');
		const getSavedData = juceLibrary.getNativeFunction('getSavedData');
		const savedData = await getSavedData();
		console.log('savedData', savedData);
		this.isInitialized = true;
	}

	getIsInitialized(): boolean {
		return this.isInitialized;
	}

	onProjectsChange?: (() => void) | undefined;

	async getProjects(): Promise<ProjectData[]> {
		// throw new Error('getProjects not implemented.');
		return [];
	}

	deleteProject(id: string): Promise<void> {
		throw new Error('deleteProject not implemented.');
	}

	getProject(id: string): Promise<ProjectData> {
		throw new Error('getProject not implemented.');
	}

	addCommand(commandData: CommandData): Promise<void> {
		throw new Error('addCommand not implemented.');
	}

	createProject(projectData: ProjectData): Promise<void> {
		throw new Error('createProject not implemented.');
	}
}
