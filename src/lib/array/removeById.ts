import type { HasId } from './HasId';
import type { Remotion } from './remotion';
import { removeByIndex } from './removeByIndex';

export function removeById<T extends HasId>(items: T[], id: string): Remotion<T> {
	const index = items.findIndex((item) => {
		return item.id == id;
	});
	if (index === -1) {
		throw new Error('Item not found');
	}
	return removeByIndex(items, index);
}
