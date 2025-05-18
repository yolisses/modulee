import type { EditorCommandClass } from './EditorCommandClass';
import { DisconnectCommand } from './connection/DisconnectCommand';
import { SetConnectionCommand } from './connection/SetConnectionCommand';
import { RedoCommand } from './editor/RedoCommand';
import { UndoCommand } from './editor/UndoCommand';
import { AddExternalModuleReferenceCommand } from './externalModule/AddExternalModuleReferenceCommand';
import { RemoveExternalModuleReferenceCommand } from './externalModule/RemoveExternalModuleReferenceCommand';
import { AddInternalModuleCommand } from './internalModule/AddInternalModuleCommand';
import { GroupNodesCommand } from './internalModule/GroupNodesCommand';
import { RemoveInternalModuleCommand } from './internalModule/RemoveInternalModuleCommand';
import { RenameInternalModuleCommand } from './internalModule/RenameInternalModuleCommand';
import { AddNodeCommand } from './node/AddNodeCommand';
import { MoveNodeCommand } from './node/MoveNodeCommand';
import { MoveNodesCommand } from './node/MoveNodesCommand';
import { PasteNodesCommand } from './node/PasteNodesCommand';
import { RemoveNodeCommand } from './node/RemoveNodeCommand';
import { RemoveNodesCommand } from './node/RemoveNodesCommand';
import { SetConstantNodeValueCommand } from './node/SetConstantNodeValueCommand';
import { SetModuleNodeModuleReferenceCommand } from './node/SetModuleNodeModuleReferenceCommand';
import { SetUnconnectedInputValueCommand } from './node/SetUnconnectedDefaultValueCommand';
import { UpdateInputNodeExtrasCommand } from './node/UpdateInputNodeExtrasCommand';

export const editorCommandClasses = [
	RedoCommand,
	UndoCommand,
	AddNodeCommand,
	MoveNodeCommand,
	MoveNodesCommand,
	DisconnectCommand,
	PasteNodesCommand,
	GroupNodesCommand,
	RemoveNodeCommand,
	RemoveNodesCommand,
	SetConnectionCommand,
	AddInternalModuleCommand,
	RemoveInternalModuleCommand,
	RenameInternalModuleCommand,
	SetConstantNodeValueCommand,
	UpdateInputNodeExtrasCommand,
	SetUnconnectedInputValueCommand,
	AddExternalModuleReferenceCommand,
	SetModuleNodeModuleReferenceCommand,
	RemoveExternalModuleReferenceCommand,
] as EditorCommandClass[];
