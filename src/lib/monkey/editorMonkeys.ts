import { AddInternalModuleMonkey } from './AddInternalModuleMonkey';
import { AddNodeMonkey } from './AddNodeMonkey';
import { RemoveNodeMonkey } from './RemoveNodeMonkey';

export const editorMonkeys = [AddNodeMonkey, RemoveNodeMonkey, AddInternalModuleMonkey];
