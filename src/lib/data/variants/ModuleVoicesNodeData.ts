import type { NodeDataBase } from '../NodeDataBase';
import type { ModuleNodeExtrasData } from './ModuleNodeExtrasData';

export type ModuleVoicesNodeData = NodeDataBase<
	'ModuleVoicesNode',
	ModuleNodeExtrasData,
	Record<never, number>
>;
