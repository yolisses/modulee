import { AddInternalModuleMonkey } from './AddInternalModuleMonkey';
import { AddNodeMonkey } from './AddNodeMonkey';
import { RemoveInternalModuleMonkey } from './RemoveInternalModuleMonkey';
import { RemoveNodeMonkey } from './RemoveNodeMonkey';

export const editorMonkeys = [
	AddNodeMonkey,
	RemoveNodeMonkey,
	AddInternalModuleMonkey,
	RemoveInternalModuleMonkey,
];
