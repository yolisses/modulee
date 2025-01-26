import type { HasId } from './HasId.js';
import type { Remotion } from './remotion.js';

export function removeById<T extends HasId>(items: T[], id: string): Remotion<T> {
	const index = items.findIndex((item) => {
		return item.id == id;
	});

	if (index === -1) {
		throw new Error('Item not found');
	}

	const item = items[index];
	items.splice(index, 1);

	return { item, index };
}
