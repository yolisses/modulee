import type { Command } from './command';
import type { Contexts } from './contexts';

type CommandConstructor = new (contexts: Contexts) => Command;

export type CommandClass = CommandConstructor;
