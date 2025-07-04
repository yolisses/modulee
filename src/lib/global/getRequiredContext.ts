import { getContext } from 'svelte';
import type { ContextsByKey } from './ContextsByKey';

export function getRequiredContext<T extends keyof ContextsByKey>(key: T): ContextsByKey[T] {
	const context = getContext<ContextsByKey[T]>(key);
	if (context === undefined) {
		throw new Error(`Context ${key.toString()} is not defined`);
	}
	return context;
}
