import type { Command } from './Command';
import type { Contexts } from './contexts';

type CommandConstructor = new (contexts: Contexts) => Command;

export type CommandClass = CommandConstructor;
