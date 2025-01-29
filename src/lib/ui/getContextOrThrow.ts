import { getContext } from 'svelte';

export function getContextOrThrow<T>(key: symbol): T {
	const context = getContext(key) as T;
	if (!context) {
		throw new Error("Can't get the context for " + key.toString());
	}
	return context;
}
