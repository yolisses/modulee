import { DisconnectMonkey } from '$lib/commands/connection/DisconnectMonkey';
import { SetConnectionMonkey } from '$lib/commands/connection/SetConnectionMonkey';
import { RedoMonkey } from '$lib/commands/editor/RedoMonkey';
import { UndoMonkey } from '$lib/commands/editor/UndoMonkey';
import { RenameInternalModuleMonkey } from '$lib/commands/internalModule/RenameInternalModuleMonkey';
import { AddNodeMonkey } from '$lib/commands/node/AddNodeMonkey';
import { MoveNodeMonkey } from '$lib/commands/node/MoveNodeMonkey';
import { MoveNodesMonkey } from '$lib/commands/node/MoveNodesMonkey';
import { PasteNodesMonkey } from '$lib/commands/node/PasteNodesMonkey';
import { RemoveNodeMonkey } from '$lib/commands/node/remove/RemoveNodeMonkey';
import { RemoveNodesMonkey } from '$lib/commands/node/remove/RemoveNodesMonkey';
import { SetConstantNodeValueMonkey } from '$lib/commands/node/SetConstantNodeValueMonkey';
import { SetModuleNodeModuleReferenceMonkey } from '$lib/commands/node/SetModuleNodeModuleReferenceMonkey';
import { SetUnconnectedInputValueMonkey } from '$lib/commands/node/SetUnconnectedInputValueMonkey';
import { AddInternalModuleMonkey } from '../commands/internalModule/AddInternalModuleMonkey';
import { RemoveInternalModuleMonkey } from '../commands/internalModule/RemoveInternalModuleMonkey';

export const editorMonkeyClasses = [
	AddInternalModuleMonkey,
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
