import type { Contexts } from './Contexts.svelte';

export abstract class ActionCommand {
	abstract execute(contexts: Contexts): void;
}
