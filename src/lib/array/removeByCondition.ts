import type { Remotion } from './remotion';

type ConditionCallback<T> = (item: T, index: number) => boolean;

/**
 * Remove items from array in place and return the remotions
 */
export function removeByCondition<T>(items: T[], condition: ConditionCallback<T>): Remotion<T>[] {
	const removals: Remotion<T>[] = [];

	// Removes in reverse order to prevent index shifting
	for (let i = items.length - 1; i >= 0; i--) {
		if (condition(items[i], i)) {
			const [removedItem] = items.splice(i, 1);
			removals.push({ item: removedItem, index: i });
		}
	}

	return removals.toReversed();
}
