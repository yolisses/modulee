import type { HasId } from '$lib/array/HasId';

// TODO consider creating a version not related with Svelte
//
// TODO find a better name for this
export class ById<T extends HasId> {
	constructor(protected content: Record<string, T> = {}) {}

	static fromItems<T extends HasId>(items: T[]) {
		const result = new ById<T>();
		items.forEach((item) => {
			result.add(item);
		});
		return result;
	}

	get(id: string) {
		const item = this.content[id];
		if (!item) {
			throw new Error('Item not found with id: ' + id);
		}
		return item;
	}

	getOrNull(id: string) {
		if (!this.containsId(id)) return null;
		return this.get(id);
	}

	set(item: T) {
		this.content[item.id] = item;
	}

	containsId(id: string) {
		return this.content[id] !== undefined;
	}

	ids() {
		return Object.keys(this.content);
	}

	values() {
		return Object.values(this.content);
	}

	add(item: T) {
		if (this.containsId(item.id)) {
			let error: Error;
			try {
				error = new Error('Item already present: ' + JSON.stringify(item));
			} catch {
				error = new Error('Item already present, with id: ' + item.id);
			}
			throw error;
		}
		this.set(item);
	}

	addMany(items: T[]) {
		items.forEach((item) => {
			this.add(item);
		});
	}

	removeById(id: string): T | undefined {
		const value = this.content[id];
		delete this.content[id];
		return value;
	}

	remove(item: T) {
		return this.removeById(item.id);
	}

	removeMany(items: T[]) {
		items.forEach((item) => {
			this.remove(item);
		});
	}

	removeByCondition(condition: (item: T) => boolean) {
		const removedItems: T[] = [];
		this.values().forEach((item) => {
			if (condition(item)) {
				this.remove(item);
				removedItems.push(item);
			}
		});
		return removedItems;
	}

	clear() {
		this.ids().forEach((id) => {
			this.removeById(id);
		});
	}

	structuredClone() {
		return new ById(structuredClone(this.content));
	}
}
