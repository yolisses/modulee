import type { CommandData } from '../editor/CommandData';
import type { EditorCommand } from '../editor/EditorCommand';

type CommandConstructor<T = unknown> = new (commandData: CommandData<T>) => EditorCommand<T>;

export type CommandClass<T = unknown> = CommandConstructor<T> & { name: string };
