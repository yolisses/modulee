import type { Remotion } from './remotion';

export function removeByIndex<T>(items: T[], index: number): Remotion<T> {
	if (index < 0 || index >= items.length) {
		throw new Error('Index out of range');
	}

	const item = items[index];
	items.splice(index, 1);

	return { item, index };
}
