import type { CommandData } from './CommandData';
import type { EditorCommand } from './EditorCommand';

export type CreateCommandCallback = (commandData: CommandData) => EditorCommand;
