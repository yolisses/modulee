import { getContext } from 'svelte';
import type { Contexts } from './Contexts';

export function getRequiredContext<T extends keyof Contexts>(key: T): Contexts[T] {
	const context = getContext<Contexts[T]>(key);
	if (context === undefined) {
		throw new Error(`Context ${key.toString()} is not defined`);
	}
	return context;
}
