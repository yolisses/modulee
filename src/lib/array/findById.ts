import type { HasId } from './HasId';

export function findById<T extends HasId>(items: T[], id: string) {
	const item = items.find((item) => item.id === id);
	if (!item) {
		throw new Error('Item not found. Id: ' + id);
	}
	return item;
}
