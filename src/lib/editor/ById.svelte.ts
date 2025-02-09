import type { HasId } from '$lib/array/HasId';

// TODO consider creating a version not related with Svelte
export class ById<T extends HasId> {
	private content: Record<string, T> = $state({});

	constructor(items: T[] = []) {
		items.forEach((item) => {
			this.content[item.id] = item;
		});
	}

	get(id: string) {
		return this.content[id];
	}

	set(item: T) {
		this.content[item.id] = item;
	}

	containsId(id: string) {
		return !!this.content[id];
	}

	ids() {
		return Object.keys(this.content);
	}

	values() {
		return Object.values(this.content);
	}

	add(item: T) {
		if (this.containsId(item.id)) {
			throw new Error('Item already present');
		}
		this.set(item);
	}

	removeById(id: string) {
		const value = this.content[id];
		delete this.content[id];
		return value;
	}

	remove(item: T) {
		return this.removeById(item.id);
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
}
