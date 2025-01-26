import type { Remotion } from './remotion.js';

export function reinsert<T>(items: T[], remotion: Remotion<T>) {
	items.splice(remotion.index, 0, remotion.item);
}
