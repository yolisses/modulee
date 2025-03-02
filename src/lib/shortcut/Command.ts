import type { Contexts } from './contexts';

export abstract class Command {
	abstract execute(contexts: Contexts): void;
}
