import type { Command } from './Command';
import type { CommandData } from './CommandData';
import type { EmptyObject } from './EmptyObject';

export type CommandClass<T = EmptyObject> = new (commandData: CommandData<T>) => Command<T>;
