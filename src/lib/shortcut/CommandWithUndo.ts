import { Command } from './Command';
import type { Contexts } from './contexts';

export abstract class CommandWithUndo extends Command {
	abstract undo(contexts: Contexts): void;
}
