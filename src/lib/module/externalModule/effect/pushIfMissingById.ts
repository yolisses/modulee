import type { HasId } from '$lib/array/HasId';

export function pushIfMissingById<T extends HasId>(items: T[], newItem: T) {
	if (items.some((item) => item.id === newItem.id)) return;
	items.push(newItem);
}
