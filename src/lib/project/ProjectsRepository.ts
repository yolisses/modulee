import type { GraphData } from '$lib/data/GraphData';
import type { ProjectData } from './ProjectData';

// TODO remove commands from persistent storage
export interface ProjectsRepository {
	initialize(): Promise<void>;
	getIsInitialized(): boolean;
	onProjectsChange?: () => void;
	getProjects(): Promise<ProjectData[]>;
	deleteProject(id: string): Promise<void>;
	getProject(id: string): Promise<ProjectData>;
	createProject(projectData: ProjectData): Promise<void>;
	renameProject(id: string, name: string): Promise<void>;
	updateProjectGraphData(id: string, graphData: GraphData): Promise<void>;
}
