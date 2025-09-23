import type { EditorCommandClass } from '$lib/commands/EditorCommandClass';
import { DisconnectCommand } from './connection/DisconnectCommand';
import { SetConnectionCommand } from './connection/SetConnectionCommand';
import { RedoCommand } from './editor/RedoCommand';
import { UndoCommand } from './editor/UndoCommand';
import { UseEffectCommand } from './externalModule/UseEffectCommand';
import { AddInternalModuleCommand } from './internalModule/AddInternalModuleCommand';
import { GroupNodesCommand } from './internalModule/GroupNodesCommand';
import { RemoveInternalModuleCommand } from './internalModule/RemoveInternalModuleCommand';
import { RenameInternalModuleCommand } from './internalModule/RenameInternalModuleCommand';
import { AddNodeCommand } from './node/AddNodeCommand';
import { MoveNodeCommand } from './node/MoveNodeCommand';
import { MoveNodesCommand } from './node/MoveNodesCommand';
import { PasteNodesCommand } from './node/PasteNodesCommand';
import { RemoveNodeCommand } from './node/remove/RemoveNodeCommand';
import { RemoveNodesCommand } from './node/remove/RemoveNodesCommand';
import { SetConstantNodeValueCommand } from './node/SetConstantNodeValueCommand';
import { SetModuleNodeModuleReferenceCommand } from './node/SetModuleNodeModuleReferenceCommand';
import { SetUnconnectedInputValueCommand } from './node/SetUnconnectedInputValueCommand';
import { UpdateInputNodeExtrasCommand } from './node/UpdateInputNodeExtrasCommand';

// Class names are not preserved on production build
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const editorCommandClassesByType: Record<string, EditorCommandClass<any>> = {
	AddInternalModuleCommand,
	AddNodeCommand,
	DisconnectCommand,
	GroupNodesCommand,
	MoveNodeCommand,
	MoveNodesCommand,
	PasteNodesCommand,
	RedoCommand,
	RemoveInternalModuleCommand,
	RemoveNodeCommand,
	RemoveNodesCommand,
	RenameInternalModuleCommand,
	SetConnectionCommand,
	SetConstantNodeValueCommand,
	SetModuleNodeModuleReferenceCommand,
	SetUnconnectedInputValueCommand,
	UndoCommand,
	UpdateInputNodeExtrasCommand,
	UseEffectCommand,
};
