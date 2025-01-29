import { AddNodeCommand } from '$lib/commands/AddNodeCommand';
import { GroupNodesCommand } from '$lib/commands/GroupNodesCommand';
import { MoveNodeCommand } from '$lib/commands/MoveNodeCommand';
import { RemoveNodeCommand } from '$lib/commands/RemoveNodeCommand';
import { SetInputConnectedOutput } from '$lib/commands/SetInputConnectedOutput';
import { UndoCommand } from '$lib/commands/UndoCommand';
import type { CommandClass } from './CommandClass';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const commandClasses: CommandClass<any>[] = [
	UndoCommand,
	AddNodeCommand,
	MoveNodeCommand,
	RemoveNodeCommand,
	GroupNodesCommand,
	SetInputConnectedOutput,
];
