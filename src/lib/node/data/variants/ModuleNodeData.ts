import type { NodeDataBase } from '../NodeDataBase';
import type { ModuleNodeExtrasData } from './ModuleNodeExtrasData';

// TODO check if it makes sense to omit unconnectedInputValues
export type ModuleNodeData = NodeDataBase<'ModuleNode', ModuleNodeExtrasData>;
