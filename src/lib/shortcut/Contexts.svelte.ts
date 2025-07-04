import type { ContextsByKey } from '$lib/global/ContextsByKey';
import { getRequiredContext } from '$lib/global/getRequiredContext';

export class Contexts {
	private contextsByKey: Partial<ContextsByKey> = {};

	get<T extends keyof ContextsByKey>(key: T): ContextsByKey[T] {
		const context = this.contextsByKey[key];
		if (context === undefined) {
			throw new Error(`Context ${key.toString()} is not defined`);
		}
		return context;
	}

	updateContext<T extends keyof ContextsByKey>(key: T) {
		$effect(() => {
			const context = getRequiredContext(key);
			this.contextsByKey[key] = context;
			return () => delete this.contextsByKey[key];
		});
	}
}
