import { openDB, type IDBPDatabase } from 'idb';
import type { CommandData } from 'modulee-nodes-editor';
import type { ProjectData } from './ProjectData';
import type { ProjectsRepository } from './ProjectsRepository';

export class LocalProjectsRepository implements ProjectsRepository {
	databaseInstance?: IDBPDatabase;

	get database() {
		if (this.databaseInstance) {
			return this.databaseInstance;
		} else {
			throw new Error('Database not initialized');
		}
	}

	async initialize() {
		this.databaseInstance = await openDB('test-db1', 1, {
			upgrade(database) {
				if (!database.objectStoreNames.contains('projects')) {
					database.createObjectStore('projects', { keyPath: 'id', autoIncrement: false });
				}

				if (!database.objectStoreNames.contains('commands')) {
					const objectStore = database.createObjectStore('commands', { keyPath: 'id' });
					objectStore.createIndex('projectId', 'projectId', { unique: true });
				}
			},
		});
	}

	async getProjects() {
		return this.database.getAll('projects');
	}

	async getCommandsOfProject(projectId: string): Promise<CommandData[]> {
		const transaction = this.database.transaction('commands', 'readonly');
		const index = transaction.store.index('projectId');
		return index.getAll(projectId);
	}

	async getProject(id: string) {
		const projectData: ProjectData = await this.database.get('projects', id);
		projectData.commands = await this.getCommandsOfProject(id);
		return projectData;
	}

	async addCommand(commandData: CommandData) {
		const transaction = this.database.transaction('commands', 'readwrite');
		await Promise.all([transaction.store.add(commandData), transaction.done]);
	}

	async createProject(projectData: ProjectData) {
		const transaction = this.database.transaction('projects', 'readwrite');
		await Promise.all([transaction.store.add(projectData), transaction.done]);
	}
}
