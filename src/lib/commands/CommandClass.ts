import type { Command } from '../editor/Command';
import type { CommandData } from '../editor/CommandData';

type CommandConstructor<T = unknown> = new (commandData: CommandData<T>) => Command<T>;

export type CommandClass<T = unknown> = CommandConstructor<T> & { name: string };
