import type { Command } from './Command';

type CommandConstructor = new () => Command;

export type CommandClass = CommandConstructor;
