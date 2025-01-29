import type { Command } from './Command';
import type { CommandData } from './CommandData';

export type CreateCommandCallback = (commandData: CommandData) => Command;
