import { openDB, type IDBPDatabase } from 'idb';
import type { CommandData } from '../../../../modulee-nodes-editor/dist/editor/CommandData';
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
			},
		});
	}

	async getProjects() {
		return this.database.getAll('projects');
	}

	async getProject(id: string) {
		return this.database.get('projects', id);
	}

	async addCommand(projectId: string, commandData: CommandData) {
		throw new Error('Method not implemented.');
	}

	async createProject(projectData: ProjectData) {
		console.log(projectData);
		const transaction = this.database.transaction('projects', 'readwrite');
		await Promise.all([transaction.store.add(projectData), transaction.done]);
	}
}
