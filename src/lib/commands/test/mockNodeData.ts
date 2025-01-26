import type { CommandData } from '$lib/editor/CommandData.js';

export function mockCommandData<T>(details: T): CommandData<T> {
	return { details } as CommandData<T>;
}
