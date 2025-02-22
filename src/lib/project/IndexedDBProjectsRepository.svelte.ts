import type { CommandData } from '$lib/editor/CommandData';
import { type IDBPDatabase, openDB } from 'idb';
import type { ProjectData } from './ProjectData';
import type { ProjectsRepository } from './ProjectsRepository';

export class IndexedDBProjectsRepository implements ProjectsRepository {
	isInitialized = $state(false);
	onProjectsChange?: () => void;
	databaseInstance?: IDBPDatabase;

	get database() {
		if (this.databaseInstance) {
			return this.databaseInstance;
		} else {
			throw new Error('Database not initialized');
		}
	}

	getIsInitialized(): boolean {
		return this.isInitialized;
	}

	async initialize() {
		this.databaseInstance = await openDB('test-db1', 1, {
			upgrade(database) {
				if (!database.objectStoreNames.contains('projects')) {
					database.createObjectStore('projects', { keyPath: 'id', autoIncrement: false });
				}

				if (!database.objectStoreNames.contains('commands')) {
					const store = database.createObjectStore('commands', { keyPath: 'id' });
					store.createIndex('projectId_createdAt', ['projectId', 'createdAt'], { unique: false });
				}
			},
		});
		this.isInitialized = true;
	}

	async getProjects() {
		return this.database.getAll('projects');
	}

	/**
	 * Returns all the commands of a project ordered by creation date
	 * @param id
	 */
	async getCommandsOfProject(id: string): Promise<CommandData[]> {
		const range = IDBKeyRange.bound([id, ''], [id, '\uFFFF']);
		return this.database.getAllFromIndex('commands', 'projectId_createdAt', range);
	}

	async getProject(id: string) {
		const projectData: ProjectData = await this.database.get('projects', id);
		projectData.commands = await this.getCommandsOfProject(id);
		console.log(projectData);
		return projectData;
	}

	async deleteProject(id: string) {
		const transaction = this.database.transaction('projects', 'readwrite');
		await Promise.all([transaction.store.delete(id), transaction.done]);
		this.onProjectsChange?.();
	}

	async addCommand(commandData: CommandData) {
		const transaction = this.database.transaction('commands', 'readwrite');
		await Promise.all([transaction.store.add(commandData), transaction.done]);
	}

	async createProject(projectData: ProjectData) {
		const transaction = this.database.transaction('projects', 'readwrite');
		await Promise.all([transaction.store.add(projectData), transaction.done]);
		this.onProjectsChange?.();
	}
}
