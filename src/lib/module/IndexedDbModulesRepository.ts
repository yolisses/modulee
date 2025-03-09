import { openDB, type IDBPDatabase } from 'idb';
import type { ModuleData } from './ModuleData';
import type { ModulesRepository } from './ModulesRepository';

export class IndexedDbModulesRepository implements ModulesRepository {
	storeName = 'modules';
	private _database?: IDBPDatabase;

	get database() {
		if (this._database) {
			return this._database;
		} else {
			throw new Error('Database not initialized');
		}
	}

	async initialize(): Promise<void> {
		this._database = await openDB('modulee-modules', 1, {
			upgrade: (database) => {
				if (!database.objectStoreNames.contains(this.storeName)) {
					database.createObjectStore('modules', { keyPath: 'id', autoIncrement: false });
				}
			},
		});
	}

	async getModules(): Promise<ModuleData[]> {
		return this.database.getAll(this.storeName);
	}

	async addModule(moduleData: ModuleData): Promise<void> {
		const transaction = this.database.transaction(this.storeName, 'readwrite');
		await Promise.all([transaction.store.add(moduleData), transaction.done]);
	}
}
