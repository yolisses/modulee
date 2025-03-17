import type { HasId } from './HasId';

export function findOrNullById<T extends HasId>(items: T[], id: string) {
	const item = items.find((item) => item.id === id);
	if (!item) {
		return null;
	}
	return item;
}
