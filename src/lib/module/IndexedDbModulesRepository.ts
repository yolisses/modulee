import { openDB, type IDBPDatabase } from 'idb';
import type { ModuleData } from './ModuleData';
import type { ModulesRepository } from './ModulesRepository';

export class IndexedDbModulesRepository implements ModulesRepository {
	private _database?: IDBPDatabase;

	get database() {
		if (this._database) {
			return this._database;
		} else {
			throw new Error('Database not initialized');
		}
	}

	async initialize(): Promise<void> {
		this._database = await openDB('modulee', 1, {
			upgrade(database) {
				if (!database.objectStoreNames.contains('modules')) {
					database.createObjectStore('modules', { keyPath: 'id', autoIncrement: false });
				}
			},
		});
	}

	async getModules(): Promise<ModuleData[]> {
		return this.database.getAll('modules');
	}
}
