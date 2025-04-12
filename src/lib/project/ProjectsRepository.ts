import type { GraphData } from '$lib/data/GraphData';
import type { ProjectData } from './ProjectData';

export interface ProjectsRepository {
	initialize(): Promise<void>;
	getIsInitialized(): boolean;
	onProjectsChange?: () => void;
	getProjects(): Promise<ProjectData[]>;
	deleteProject(id: string): Promise<void>;
	getProject(id: string): Promise<ProjectData>;
	// TODO consider renaming createProject to addProject since it doesn't create a new id
	createProject(projectData: ProjectData): Promise<void>;
	renameProject(id: string, name: string): Promise<void>;
	updateProjectGraph(id: string, graphData: GraphData): Promise<void>;
}
