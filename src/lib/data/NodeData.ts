import type { ConstantNodeData } from './variants/ConstantNodeData';
import type { InputNodeData } from './variants/InputNodeData';
import type { InternalModuleNodeData } from './variants/InternalModuleNodeData';
import type { InternalModuleVoicesNodeData } from './variants/InternalModuleVoicesNodeData';

export type NodeData =
	| InputNodeData
	| InternalModuleNodeData
	| ConstantNodeData
	| InternalModuleVoicesNodeData;
