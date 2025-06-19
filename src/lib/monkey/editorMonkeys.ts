import { SetConnectionMonkey } from '$lib/commands/connection/SetConnectionMonkey';
import { AddNodeMonkey } from '$lib/commands/node/AddNodeMonkey';
import { RemoveNodeMonkey } from '$lib/commands/node/RemoveNodeMonkey';
import { AddInternalModuleMonkey } from '../commands/internalModule/AddInternalModuleMonkey';
import { RemoveInternalModuleMonkey } from '../commands/internalModule/RemoveInternalModuleMonkey';

export const editorMonkeys = [
	AddNodeMonkey,
	RemoveNodeMonkey,
	SetConnectionMonkey,
	AddInternalModuleMonkey,
	RemoveInternalModuleMonkey,
];
