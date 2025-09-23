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
import { SetConstantNodeValueCommand } from './node/attribute/SetConstantNodeValueCommand';
import { SetModuleNodeModuleReferenceCommand } from './node/attribute/SetModuleNodeModuleReferenceCommand';
import { SetUnconnectedInputValueCommand } from './node/attribute/SetUnconnectedInputValueCommand';
import { UpdateInputNodeExtrasCommand } from './node/attribute/UpdateInputNodeExtrasCommand';
import { AddNodeCommand } from './node/create/AddNodeCommand';
import { PasteNodesCommand } from './node/create/PasteNodesCommand';
import { MoveNodeCommand } from './node/move/MoveNodeCommand';
import { MoveNodesCommand } from './node/move/MoveNodesCommand';
import { RemoveNodeCommand } from './node/remove/RemoveNodeCommand';
import { RemoveNodesCommand } from './node/remove/RemoveNodesCommand';

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
