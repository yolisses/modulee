import type { CommandData } from '$lib/editor/CommandData';

export function mockCommandData<T>(details: T): CommandData<T> {
	return { details } as CommandData<T>;
}
