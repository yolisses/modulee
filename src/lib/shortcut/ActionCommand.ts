import type { Contexts } from './contexts';

export abstract class ActionCommand {
	abstract execute(contexts: Contexts): void;
}
