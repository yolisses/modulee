import { AddNodeCommand } from '$lib/commands/AddNodeCommand';
import { DisconnectCommand } from '$lib/commands/DisconnectCommand';
import { GroupNodesCommand } from '$lib/commands/GroupNodesCommand';
import { MoveNodeCommand } from '$lib/commands/MoveNodeCommand';
import { MoveNodesCommand } from '$lib/commands/MoveNodesCommand';
import { RedoCommand } from '$lib/commands/RedoCommand';
import { RemoveNodeCommand } from '$lib/commands/RemoveNodeCommand';
import { SetConnectionCommand } from '$lib/commands/SetConnectionCommand';
import { SetConstantNodeValueCommand } from '$lib/commands/SetConstantNodeValueCommand';
import { UndoCommand } from '$lib/commands/UndoCommand';
import type { CommandClass } from './CommandClass';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const commandClasses: CommandClass<any>[] = [
	RedoCommand,
	UndoCommand,
	AddNodeCommand,
	MoveNodeCommand,
	MoveNodesCommand,
	DisconnectCommand,
	GroupNodesCommand,
	RemoveNodeCommand,
	SetConnectionCommand,
	SetConstantNodeValueCommand,
];
