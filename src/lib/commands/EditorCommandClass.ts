import type { EditorCommand } from '../editor/EditorCommand';
import type { EditorCommandData } from '../editor/EditorCommandData';

type EditorCommandConstructor<T = unknown> = new (
	commandData: EditorCommandData<T>,
) => EditorCommand<T>;

export type EditorCommandClass<T = unknown> = EditorCommandConstructor<T> & { name: string };
