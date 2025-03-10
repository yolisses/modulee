import type { EditorCommandClass } from './EditorCommandClass';
import { DisconnectCommand } from './connection/DisconnectCommand';
import { SetConnectionCommand } from './connection/SetConnectionCommand';
import { RedoCommand } from './editor/RedoCommand';
import { UndoCommand } from './editor/UndoCommand';
import { AddInternalModuleCommand } from './internalModule/AddInternalModuleCommand';
import { InternalModuleNodesCommand } from './internalModule/InternalModuleNodesCommand';
import { RemoveInternalModuleCommand } from './internalModule/RemoveInternalModuleCommand';
import { RenameInternalModuleCommand } from './internalModule/RenameInternalModuleCommand';
import { AddNodeCommand } from './node/AddNodeCommand';
import { MoveNodeCommand } from './node/MoveNodeCommand';
import { MoveNodesCommand } from './node/MoveNodesCommand';
import { RemoveNodeCommand } from './node/RemoveNodeCommand';
import { RemoveNodesCommand } from './node/RemoveNodesCommand';
import { SetConstantNodeValueCommand } from './node/SetConstantNodeValueCommand';
import { SetInternalModuleNodeTargetInternalModuleIdCommand } from './node/SetInternalModuleNodeTargetInternalModuleIdCommand';

export const editorCommandClasses = [
	RedoCommand,
	UndoCommand,
	AddNodeCommand,
	AddInternalModuleCommand,
	MoveNodeCommand,
	MoveNodesCommand,
	DisconnectCommand,
	InternalModuleNodesCommand,
	RemoveNodeCommand,
	RemoveInternalModuleCommand,
	RemoveNodesCommand,
	RenameInternalModuleCommand,
	SetConnectionCommand,
	SetConstantNodeValueCommand,
	SetInternalModuleNodeTargetInternalModuleIdCommand,
] as EditorCommandClass[];
