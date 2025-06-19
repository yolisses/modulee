import { DisconnectMonkey } from '$lib/commands/connection/DisconnectMonkey';
import { SetConnectionMonkey } from '$lib/commands/connection/SetConnectionMonkey';
import { RedoMonkey } from '$lib/commands/editor/RedoMonkey';
import { UndoMonkey } from '$lib/commands/editor/UndoMonkey';
import { RenameInternalModuleMonkey } from '$lib/commands/internalModule/RenameInternalModuleMonkey';
import { AddNodeMonkey } from '$lib/commands/node/AddNodeMonkey';
import { MoveNodeMonkey } from '$lib/commands/node/MoveNodeMonkey';
import { MoveNodesMonkey } from '$lib/commands/node/MoveNodesMonkey';
import { PasteNodesMonkey } from '$lib/commands/node/PasteNodesMonkey';
import { RemoveNodeMonkey } from '$lib/commands/node/RemoveNodeMonkey';
import { RemoveNodesMonkey } from '$lib/commands/node/RemoveNodesMonkey';
import { SetConstantNodeValueMonkey } from '$lib/commands/node/SetConstantNodeValueMonkey';
import { AddInternalModuleMonkey } from '../commands/internalModule/AddInternalModuleMonkey';
import { RemoveInternalModuleMonkey } from '../commands/internalModule/RemoveInternalModuleMonkey';

export const editorMonkeyClasses = [
	RedoMonkey,
	UndoMonkey,
	AddNodeMonkey,
	MoveNodeMonkey,
	MoveNodesMonkey,
	DisconnectMonkey,
	RemoveNodeMonkey,
	PasteNodesMonkey,
	RemoveNodesMonkey,
	SetConnectionMonkey,
	AddInternalModuleMonkey,
	RemoveInternalModuleMonkey,
	RenameInternalModuleMonkey,
	SetConstantNodeValueMonkey,
];
