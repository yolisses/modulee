import type { Remotion } from './remotion';

export function reinsert<T>(items: T[], remotion: Remotion<T>) {
	items.splice(remotion.index, 0, remotion.item);
}
