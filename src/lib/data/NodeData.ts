import type { ConstantNodeData } from './variants/ConstantNodeData';
import type { ControlNodeData } from './variants/ControlNodeData';
import type { InputNodeData } from './variants/InputNodeData';
import type { ModuleNodeData } from './variants/ModuleNodeData';
import type { ModuleVoicesNodeData } from './variants/ModuleVoicesNodeData';

// Technically, a NodeData can be a NodeDataBase<unknown, unknown>, but it
// doesn't seem necessary and could lead to reduced IntelliSense.
export type NodeData =
	| InputNodeData
	| ModuleNodeData
	| ControlNodeData
	| ConstantNodeData
	| ModuleVoicesNodeData;
