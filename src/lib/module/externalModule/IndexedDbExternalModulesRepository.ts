import { openDB, type IDBPDatabase } from 'idb';
import type { ExternalModuleData } from './ExternalModuleData';
import type { ExternalModulesRepository } from './ExternalModulesRepository';

export class IndexedDbExternalModulesRepository implements ExternalModulesRepository {
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

	async getExternalModules(): Promise<ExternalModuleData[]> {
		return this.database.getAll(this.storeName);
	}

	async getExternalModulesById(ids: string[]): Promise<ExternalModuleData[]> {
		return Promise.all(
			ids.map((id) => {
				const query = IDBKeyRange.only(id);
				return this.database.get(this.storeName, query);
			}),
		);
	}

	async addExternalModule(externalModuleData: ExternalModuleData): Promise<void> {
		const transaction = this.database.transaction(this.storeName, 'readwrite');
		await Promise.all([transaction.store.add(externalModuleData), transaction.done]);
	}

	async deleteExternalModule(id: string) {
		await this.database.delete(this.storeName, id);
	}
}
