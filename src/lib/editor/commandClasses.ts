import { AddNodeCommand } from '$lib/node/commands/AddNodeCommand';
import { MoveNodeCommand } from '$lib/node/commands/MoveNodeCommand';
import { RemoveNodeCommand } from '$lib/node/commands/RemoveNodeCommand';
import type { CommandClass } from './CommandClass';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const commandClasses: CommandClass<any>[] = [
	AddNodeCommand,
	RemoveNodeCommand,
	MoveNodeCommand,
];
