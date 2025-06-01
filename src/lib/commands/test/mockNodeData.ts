import { EditorCommandData } from '../../editor/EditorCommandData';

export function mockCommandData<T>(details: T): EditorCommandData<T> {
	return { details } as EditorCommandData<T>;
}
