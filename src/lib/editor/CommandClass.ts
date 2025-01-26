import type { Command } from './Command.js';
import type { CommandData } from './CommandData.js';
import type { EmptyObject } from './EmptyObject.js';

export type CommandClass<T = EmptyObject> = new (commandData: CommandData<T>) => Command<T>;
