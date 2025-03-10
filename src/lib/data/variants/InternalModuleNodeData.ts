import type { NodeDataBase } from '../NodeDataBase';
import type { InternalModuleNodeExtrasData } from './InternalModuleNodeExtrasData';

export type InternalModuleNodeData = NodeDataBase<
	'InternalModuleNode',
	InternalModuleNodeExtrasData
>;
