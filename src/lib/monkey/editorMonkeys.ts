import { DisconnectMonkey } from '$lib/commands/connection/DisconnectMonkey';
import { SetConnectionMonkey } from '$lib/commands/connection/SetConnectionMonkey';
import { UndoMonkey } from '$lib/commands/editor/UndoMonkey';
import { AddNodeMonkey } from '$lib/commands/node/AddNodeMonkey';
import { RemoveNodeMonkey } from '$lib/commands/node/RemoveNodeMonkey';
import { AddInternalModuleMonkey } from '../commands/internalModule/AddInternalModuleMonkey';
import { RemoveInternalModuleMonkey } from '../commands/internalModule/RemoveInternalModuleMonkey';

export const editorMonkeys = [
	UndoMonkey,
	AddNodeMonkey,
	DisconnectMonkey,
	RemoveNodeMonkey,
	SetConnectionMonkey,
	AddInternalModuleMonkey,
	RemoveInternalModuleMonkey,
];
