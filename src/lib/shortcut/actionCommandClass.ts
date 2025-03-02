import type { ActionCommand } from './ActionCommand';

type ActionCommandConstructor = new () => ActionCommand;

export type ActionCommandClass = ActionCommandConstructor;
