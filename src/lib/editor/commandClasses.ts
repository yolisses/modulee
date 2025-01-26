import { AddNodeCommand } from '$lib/commands/AddNodeCommand.js';
import { MoveNodeCommand } from '$lib/commands/MoveNodeCommand.js';
import { RemoveNodeCommand } from '$lib/commands/RemoveNodeCommand.js';
import { SetInputConnectedOutput } from '$lib/commands/SetInputConnectedOutput.js';
import type { CommandClass } from './CommandClass.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const commandClasses: CommandClass<any>[] = [
	AddNodeCommand,
	MoveNodeCommand,
	RemoveNodeCommand,
	SetInputConnectedOutput,
];
