import { SetConnectionCommand } from '$lib/commands/connection/SetConnectionCommand';
import { DisconnectCommand } from '$lib/commands/DisconnectCommand';
import { RedoCommand } from '$lib/commands/editor/RedoCommand';
import { UndoCommand } from '$lib/commands/editor/UndoCommand';
import { AddGroupCommand } from '$lib/commands/group/AddGroupCommand';
import { GroupNodesCommand } from '$lib/commands/group/GroupNodesCommand';
import { AddNodeCommand } from '$lib/commands/node/AddNodeCommand';
import { MoveNodeCommand } from '$lib/commands/node/MoveNodeCommand';
import { MoveNodesCommand } from '$lib/commands/node/MoveNodesCommand';
import { RemoveNodeCommand } from '$lib/commands/node/RemoveNodeCommand';
import { SetConstantNodeValueCommand } from '$lib/commands/node/SetConstantNodeValueCommand';
import { SetGroupNodeTargetGroupIdCommand } from '$lib/commands/node/SetGroupNodeTargetGroupIdCommand';
import type { CommandClass } from './CommandClass';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const commandClasses: CommandClass<any>[] = [
	RedoCommand,
	UndoCommand,
	AddNodeCommand,
	AddGroupCommand,
	MoveNodeCommand,
	MoveNodesCommand,
	DisconnectCommand,
	GroupNodesCommand,
	RemoveNodeCommand,
	SetConnectionCommand,
	SetConstantNodeValueCommand,
	SetGroupNodeTargetGroupIdCommand,
];
