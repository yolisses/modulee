import type { AudioInputNodeData } from './variants/AudioInputNodeData';
import type { ConstantNodeData } from './variants/ConstantNodeData';
import type { ControlNodeData } from './variants/ControlNodeData';
import type { DelayNodeData } from './variants/DelayNodeData';
import type { InputNodeData } from './variants/InputNodeData';
import type { ModuleNodeData } from './variants/ModuleNodeData';
import type { ModuleVoicesNodeData } from './variants/ModuleVoicesNodeData';
import type { NoiseNodeData } from './variants/NoiseNodeData';
import type { OutputNodeData } from './variants/OutputNodeData';
import type { RandomNodeData } from './variants/RandomNodeData';
import type { TriangleWaveNodeData } from './variants/TriangleWaveNodeData';
import type { ValueFromChannelNodeData } from './variants/ValueFromChannelNodeData';

export type NodeData =
	| AudioInputNodeData
	| ConstantNodeData
	| ControlNodeData
	| DelayNodeData
	| InputNodeData
	| ModuleNodeData
	| ModuleVoicesNodeData
	| NoiseNodeData
	| OutputNodeData
	| RandomNodeData
	| TriangleWaveNodeData
	| ValueFromChannelNodeData;

// Technically, a NodeData can represent any node variant, but it doesn't seem
// necessary.
