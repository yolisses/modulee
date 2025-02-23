import type { CommandData } from '$lib/editor/CommandData';
import type { ProjectData } from './ProjectData';

export interface ProjectsRepository {
	initialize(): Promise<void>;
	getIsInitialized(): boolean;
	onProjectsChange?: () => void;
	getProjects(): Promise<ProjectData[]>;
	deleteProject(id: string): Promise<void>;
	getProject(id: string): Promise<ProjectData>;
	addCommand(commandData: CommandData): Promise<void>;
	createProject(projectData: ProjectData): Promise<void>;
	renameProject(id: string, name: string): Promise<void>;
}
