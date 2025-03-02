import type { EditorCommandClass } from './EditorCommandClass';
import { DisconnectCommand } from './connection/DisconnectCommand';
import { SetConnectionCommand } from './connection/SetConnectionCommand';
import { RedoCommand } from './editor/RedoCommand';
import { UndoCommand } from './editor/UndoCommand';
import { AddGroupCommand } from './group/AddGroupCommand';
import { GroupNodesCommand } from './group/GroupNodesCommand';
import { RemoveGroupCommand } from './group/RemoveGroupCommand';
import { RenameGroupCommand } from './group/RenameGroupCommand';
import { AddNodeCommand } from './node/AddNodeCommand';
import { MoveNodeCommand } from './node/MoveNodeCommand';
import { MoveNodesCommand } from './node/MoveNodesCommand';
import { RemoveNodeCommand } from './node/RemoveNodeCommand';
import { RemoveNodesCommand } from './node/RemoveNodesCommand';
import { SetConstantNodeValueCommand } from './node/SetConstantNodeValueCommand';
import { SetGroupNodeTargetGroupIdCommand } from './node/SetGroupNodeTargetGroupIdCommand';

export const editorCommandClasses = [
	RedoCommand,
	UndoCommand,
	AddNodeCommand,
	AddGroupCommand,
	MoveNodeCommand,
	MoveNodesCommand,
	DisconnectCommand,
	GroupNodesCommand,
	RemoveNodeCommand,
	RemoveGroupCommand,
	RemoveNodesCommand,
	RenameGroupCommand,
	SetConnectionCommand,
	SetConstantNodeValueCommand,
	SetGroupNodeTargetGroupIdCommand,
] as EditorCommandClass[];
