import { getContext } from 'svelte';
import type { ContextsByKey } from './ContextsByKey';

export function getTypedContext<T extends keyof ContextsByKey>(
	key: T,
): ContextsByKey[T] | undefined {
	return getContext<ContextsByKey[T]>(key);
}
