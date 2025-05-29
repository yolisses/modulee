import type { ConstantNodeData } from './variants/ConstantNodeData';
import type { ControlNodeData } from './variants/ControlNodeData';
import type { InputNodeData } from './variants/InputNodeData';
import type { ModuleNodeData } from './variants/ModuleNodeData';
import type { ModuleVoicesNodeData } from './variants/ModuleVoicesNodeData';
import type { OutputNodeData } from './variants/OutputNodeData';

// Technically, a NodeData can represent any node variant, but it doesn't seem
// necessary.
export type NodeData =
	| InputNodeData
	| OutputNodeData
	| ModuleNodeData
	| ControlNodeData
	| ConstantNodeData
	| ModuleVoicesNodeData;
