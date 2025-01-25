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
					const store = database.createObjectStore('commands', { keyPath: 'id' });
					store.createIndex('projectId_createdAt', ['projectId', 'createdAt'], { unique: false });
				}
			},
		});
	}

	async getProjects() {
		return this.database.getAll('projects');
	}

	/**
	 * Returns all the commands of a project ordered by creation date
	 * @param projectId
	 */
	async getCommandsOfProject(projectId: string): Promise<CommandData[]> {
		// Define a range that includes all records with the given projectId
		const range = IDBKeyRange.bound(
			[projectId, ''], // Start of range: `projectId` with the earliest possible `createdAt`
			[projectId, '\uFFFF'], // End of range: `projectId` with the highest possible `createdAt`
		);

		// Query using the composite index
		return this.database.getAllFromIndex('commands', 'projectId_createdAt', range);
	}

	async getProject(id: string) {
		const projectData: ProjectData = await this.database.get('projects', id);
		projectData.commands = await this.getCommandsOfProject(id);
		return projectData;
	}

	async addCommand(commandData: CommandData) {
		const transaction = this.database.transaction('commands', 'readwrite');
		await Promise.all([transaction.store.add(commandData), transaction.done]).catch(console.error);
	}

	async createProject(projectData: ProjectData) {
		const transaction = this.database.transaction('projects', 'readwrite');
		await Promise.all([transaction.store.add(projectData), transaction.done]);
	}
}
