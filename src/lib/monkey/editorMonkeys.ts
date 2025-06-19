import { AddInternalModuleMonkey } from '../commands/internalModule/AddInternalModuleMonkey';
import { RemoveInternalModuleMonkey } from '../commands/internalModule/RemoveInternalModuleMonkey';
import { AddNodeMonkey } from './AddNodeMonkey';
import { RemoveNodeMonkey } from './RemoveNodeMonkey';

export const editorMonkeys = [
	AddNodeMonkey,
	RemoveNodeMonkey,
	AddInternalModuleMonkey,
	RemoveInternalModuleMonkey,
];
