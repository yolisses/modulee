import { DisconnectMonkey } from '$lib/commands/connection/DisconnectMonkey';
import { SetConnectionMonkey } from '$lib/commands/connection/SetConnectionMonkey';
import { RedoMonkey } from '$lib/commands/editor/RedoMonkey';
import { UndoMonkey } from '$lib/commands/editor/UndoMonkey';
import { AddInternalModuleWithOutputNodeMonkey } from '$lib/commands/internalModule/AddInternalModuleWithOutputNodeMonkey';
import { RenameInternalModuleMonkey } from '$lib/commands/internalModule/RenameInternalModuleMonkey';
import { SetConstantNodeValueMonkey } from '$lib/commands/node/attribute/SetConstantNodeValueMonkey';
import { SetModuleNodeModuleReferenceMonkey } from '$lib/commands/node/attribute/SetModuleNodeModuleReferenceMonkey';
import { SetUnconnectedInputValueMonkey } from '$lib/commands/node/attribute/SetUnconnectedInputValueMonkey';
import { AddNodeMonkey } from '$lib/commands/node/create/AddNodeMonkey';
import { PasteNodesMonkey } from '$lib/commands/node/create/PasteNodesMonkey';
import { MoveNodeMonkey } from '$lib/commands/node/move/MoveNodeMonkey';
import { MoveNodesMonkey } from '$lib/commands/node/move/MoveNodesMonkey';
import { RemoveNodeMonkey } from '$lib/commands/node/remove/RemoveNodeMonkey';
import { RemoveNodesMonkey } from '$lib/commands/node/remove/RemoveNodesMonkey';
import { AddInternalModuleMonkey } from '../commands/internalModule/AddInternalModuleMonkey';
import { RemoveInternalModuleMonkey } from '../commands/internalModule/RemoveInternalModuleMonkey';

export const editorMonkeyClasses = [
	AddInternalModuleMonkey,
	AddInternalModuleWithOutputNodeMonkey,
	AddNodeMonkey,
	DisconnectMonkey,
	MoveNodeMonkey,
	MoveNodesMonkey,
	PasteNodesMonkey,
	RedoMonkey,
	RemoveInternalModuleMonkey,
	RemoveNodeMonkey,
	RemoveNodesMonkey,
	RenameInternalModuleMonkey,
	SetConnectionMonkey,
	SetConstantNodeValueMonkey,
	SetModuleNodeModuleReferenceMonkey,
	SetUnconnectedInputValueMonkey,
	UndoMonkey,
];
