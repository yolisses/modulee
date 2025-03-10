import type { ConstantNodeData } from './variants/ConstantNodeData';
import type { InputNodeData } from './variants/InputNodeData';
import type { ModuleNodeData } from './variants/ModuleNodeData';
import type { ModuleVoicesNodeData } from './variants/ModuleVoicesNodeData';

export type NodeData = InputNodeData | ModuleNodeData | ConstantNodeData | ModuleVoicesNodeData;
