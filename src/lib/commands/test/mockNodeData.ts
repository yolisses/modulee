import type { EditorCommandData } from '$lib/editor/EditorCommandData';

export function mockCommandData<T>(details: T): EditorCommandData<T> {
	return { details } as EditorCommandData<T>;
}
