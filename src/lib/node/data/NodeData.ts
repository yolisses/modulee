import type { AudioInputNodeData } from './variants/AudioInputNodeData';
import type { ConstantNodeData } from './variants/ConstantNodeData';
import type { ControlNodeData } from './variants/ControlNodeData';
import type { DelayNodeData } from './variants/DelayNodeData';
import type { InputNodeData } from './variants/InputNodeData';
import type { ModuleNodeData } from './variants/ModuleNodeData';
import type { ModuleVoicesNodeData } from './variants/ModuleVoicesNodeData';
import type { OutputNodeData } from './variants/OutputNodeData';
import type { TriangleNodeData } from './variants/TriangleNodeData';

// Technically, a NodeData can represent any node variant, but it doesn't seem
// necessary.
export type NodeData =
	| AudioInputNodeData
	| ConstantNodeData
	| ControlNodeData
	| DelayNodeData
	| InputNodeData
	| ModuleNodeData
	| ModuleVoicesNodeData
	| OutputNodeData
	| TriangleNodeData;
